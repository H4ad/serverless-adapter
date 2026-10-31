import { checkHttpCases } from './cases';
import { createApp } from './fixture/app';
import { errorMessage } from './lib/smoke';
import { clearState, loadState } from './lib/state';
import type { CloudModule, CloudName, RunState } from './lib/types';

const CLOUDS: CloudName[] = ['aws', 'azure', 'do', 'edge', 'firebase', 'gcp'];

const loaders: Record<CloudName, () => Promise<{ cloudModule: CloudModule }>> =
  {
    aws: () => import('./aws'),
    azure: () => import('./azure'),
    do: () => import('./do'),
    edge: () => import('./edge'),
    firebase: () => import('./firebase'),
    gcp: () => import('./gcp'),
  };

async function main(): Promise<number> {
  const [phase = 'run', ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);

  if (phase === 'local') return local();
  if (phase === 'reap') {
    const { reap } = await import('./reap');

    return (await reap({ dryRun: args.has('dry-run') })) ? 0 : 1;
  }

  const cloud = (args.get('cloud') as CloudName | undefined) ?? 'aws';

  if (!CLOUDS.includes(cloud)) {
    throw new Error(
      `Unknown cloud "${cloud}". Use one of ${CLOUDS.join(', ')}.`,
    );
  }

  const cloudModule = (await loaders[cloud]()).cloudModule;

  switch (phase) {
    case 'up':
      await cloudModule.up();

      return 0;
    case 'test':
      return (await cloudModule.test(requireState(cloud))) ? 0 : 1;
    case 'down':
      await cloudModule.down();

      return 0;
    case 'leftovers':
      return reportLeftovers(await cloudModule.leftovers(), cloud);
    case 'run':
      return runAll(cloud, cloudModule, args.has('keep'));
    default:
      throw new Error(
        `Unknown phase "${phase}". Use local, up, test, down, leftovers, run or reap.`,
      );
  }
}

/**
 * Up, test and down in one process. The teardown runs from a finally block so
 * a failed or throwing test still cleans up, and the leftover check runs after
 * it because a teardown that quietly failed is the expensive case.
 */
async function runAll(
  cloud: CloudName,
  cloudModule: CloudModule,
  keep: boolean,
): Promise<number> {
  let state: RunState | undefined;
  let passed = false;
  let failure: unknown;

  try {
    state = await cloudModule.up();
    passed = await cloudModule.test(state);
  } catch (error) {
    failure = error;
    console.error(`\n[${cloud}] run failed: ${errorMessage(error)}`);
  } finally {
    if (keep && state) {
      console.log(`[${cloud}] --keep is set, leaving resources up.`);
      console.log(
        `[${cloud}] tear down with: npm run e2e:down -- --cloud ${cloud}`,
      );
    } else {
      try {
        await cloudModule.down(state);
      } catch (error) {
        passed = false;
        console.error(`\n[${cloud}] teardown failed: ${errorMessage(error)}`);
      }
    }
  }

  if (!keep) {
    const leftovers = await cloudModule.leftovers(state);

    if (leftovers.length > 0) {
      passed = false;
      console.error(`[${cloud}] leftovers after teardown:`);

      for (const item of leftovers) console.error(`  - ${item}`);
    }

    clearState(cloud);
  }

  return failure || !passed ? 1 : 0;
}

function reportLeftovers(found: string[], cloud: CloudName): number {
  if (found.length === 0) {
    console.log(`[${cloud}] no leftovers`);

    return 0;
  }

  console.error(`[${cloud}] leftovers:`);

  for (const item of found) console.error(`  - ${item}`);

  return 1;
}

function requireState(cloud: CloudName): RunState {
  const state = loadState(cloud);

  if (!state) {
    throw new Error(
      `No state for ${cloud}. Run npm run e2e:up -- --cloud ${cloud} first.`,
    );
  }

  return state;
}

/**
 * Serves the fixture over plain HTTP and runs the cases against it. This is
 * the harness checking itself, with no account and no deploy.
 */
async function local(): Promise<number> {
  const app = createApp({
    onEventResult(source, body) {
      console.log(`E2E_RESULT ${source} ${body.toString('base64')}`);
    },
  });

  const server = app.listen(0, '127.0.0.1');

  await new Promise<void>((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });

  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    return (await checkHttpCases('local: fixture app', baseUrl, 'aws')) ? 0 : 1;
  } finally {
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
}

function parseArgs(argv: string[]): Map<string, string | boolean> {
  const args = new Map<string, string | boolean>();

  for (let index = 0; index < argv.length; index++) {
    const token = argv[index];

    if (!token.startsWith('--')) continue;

    const key = token.slice(2);
    const next = argv[index + 1];

    if (next !== undefined && !next.startsWith('--')) {
      args.set(key, next);
      index++;
    } else args.set(key, true);
  }

  return args;
}

main()
  .then(code => process.exit(code))
  .catch(error => {
    console.error(`\n${errorMessage(error)}`);
    process.exit(1);
  });

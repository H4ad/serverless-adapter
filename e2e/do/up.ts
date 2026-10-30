import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRunId, expiry } from '../lib/run';
import { requireCommand, run, runResult } from '../lib/shell';
import { saveState } from '../lib/state';
import type { RunState } from '../lib/types';
import {
  PACKAGE,
  faasHostFromEnv,
  functionNameFor,
  projectDirectory,
  regionFromEnv,
} from './names';

export async function up(): Promise<RunState> {
  requireCommand('doctl', 'Install doctl and run doctl auth init first.');
  requireCommand('npx', 'Install Node.js and npm.');

  const runId = createRunId();
  const expireAt = expiry();
  const region = regionFromEnv();
  const namespace = process.env.DO_NAMESPACE ?? '';
  const functionName = functionNameFor(runId);

  const state: RunState = {
    cloud: 'do',
    runId,
    createdAt: new Date().toISOString(),
    expireAt,
    region,
    endpoints: {},
    resources: { package: PACKAGE, functionName, namespace },
  };

  saveState(state);

  if (namespace) {
    // doctl serverless uses a local namespace context. Connecting explicitly
    // makes the job independent of whatever is on the runner already.
    run('doctl', ['serverless', 'connect', namespace], {
      allowFailure: true,
      inherit: true,
    });
  }

  buildProject(functionName);

  run('doctl', ['serverless', 'deploy', projectDirectory()], {
    inherit: true,
  });

  const baseUrl = resolveUrl(namespace, region, functionName);

  state.endpoints = { baseUrl };
  saveState(state);

  console.log(`\n[do] ${PACKAGE}/${functionName} is up at ${baseUrl}`);

  return state;
}

function buildProject(functionName: string): void {
  const directory = projectDirectory();
  const functionDirectory = join(directory, 'packages', PACKAGE, functionName);

  rmSync(directory, { recursive: true, force: true });
  mkdirSync(functionDirectory, { recursive: true });

  run(
    'npx',
    [
      'esbuild',
      'e2e/do/function.ts',
      '--bundle',
      '--platform=node',
      '--target=node20',
      '--format=cjs',
      '--outfile',
      join(functionDirectory, 'index.js'),
    ],
    { inherit: true },
  );

  // The function name carries the run id, so each run deploys into the same
  // package without touching an earlier one.
  writeFileSync(
    join(directory, 'project.yml'),
    [
      'packages:',
      `  - name: ${PACKAGE}`,
      '    functions:',
      `      - name: '${functionName}'`,
      `        main: 'index.main'`,
      `        runtime: 'nodejs:20'`,
      `        web: 'raw'`,
      '',
    ].join('\n'),
  );
}

function resolveUrl(
  namespace: string,
  region: string,
  functionName: string,
): string {
  const described = runResult(
    'doctl',
    ['serverless', 'functions', 'get', `${PACKAGE}/${functionName}`, '--url'],
    { allowFailure: true },
  );

  if (described.ok) {
    const candidate = described.output
      .trim()
      .split(/\s+/)
      .find(token => token.startsWith('https://'));

    if (candidate) return candidate.replace(/\/+$/, '');
  }

  if (namespace)
    return `https://${faasHostFromEnv(region)}/api/v1/web/${namespace}/${PACKAGE}/${functionName}`;

  throw new Error(
    'Could not resolve the function URL from doctl. Set DO_NAMESPACE to the namespace id (the fn-... value) and DO_REGION.',
  );
}

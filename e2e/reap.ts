import { PACKAGE } from './do/names';
import { isExpired, runIdTime } from './lib/run';
import { commandExists, run, runResult } from './lib/shell';

export interface ReapOptions {
  dryRun: boolean;
}

const STALE_MS = 6 * 60 * 60 * 1000;

/**
 * The safety net for a run that never reached its own teardown. Every cloud
 * path is independent: one broken credential does not stop the other two.
 */
export async function reap(options: ReapOptions): Promise<boolean> {
  const tasks: Array<[string, (opts: ReapOptions) => Promise<boolean>]> = [
    ['aws', reapAws],
    ['azure', reapAzure],
    ['do', reapDo],
  ];

  let ok = true;

  for (const [name, task] of tasks) {
    try {
      const passed = await task(options);
      ok = passed && ok;
    } catch (error) {
      ok = false;
      console.error(
        `[${name}] reap failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  return ok;
}

async function reapAws(options: ReapOptions): Promise<boolean> {
  if (!commandExists('aws')) {
    console.warn('[aws] aws CLI not found, skipping');

    return true;
  }

  let ok = true;

  for (const region of awsRegions()) {
    const listed = runResult(
      'aws',
      [
        'cloudformation',
        'list-stacks',
        '--stack-status-filter',
        'CREATE_COMPLETE',
        'UPDATE_COMPLETE',
        'ROLLBACK_COMPLETE',
        'CREATE_FAILED',
        'UPDATE_ROLLBACK_COMPLETE',
        '--query',
        "StackSummaries[?starts_with(StackName, 'sae2e-')].StackName",
        '--output',
        'json',
        '--region',
        region,
      ],
      { allowFailure: true },
    );

    if (!listed.ok) {
      ok = false;
      console.warn(`[aws] could not list stacks in ${region}`);
      continue;
    }

    const stackNames = JSON.parse(listed.output) as string[];
    const now = new Date();

    for (const stackName of stackNames) {
      if (!shouldReap(stackName, stackExpireAt(stackName, region), now))
        continue;

      if (options.dryRun) {
        console.log(`[aws] would delete stack ${stackName} (${region})`);
        continue;
      }

      console.log(`[aws] deleting stack ${stackName} (${region})`);
      run(
        'aws',
        ['s3', 'rm', `s3://${stackName}`, '--recursive', '--region', region],
        { allowFailure: true },
      );

      if (commandExists('sam')) {
        run(
          'sam',
          [
            'delete',
            '--stack-name',
            stackName,
            '--no-prompts',
            '--region',
            region,
          ],
          { allowFailure: true, inherit: true },
        );
      } else {
        run(
          'aws',
          [
            'cloudformation',
            'delete-stack',
            '--stack-name',
            stackName,
            '--region',
            region,
          ],
          { allowFailure: true, inherit: true },
        );
        run(
          'aws',
          [
            'cloudformation',
            'wait',
            'stack-delete-complete',
            '--stack-name',
            stackName,
            '--region',
            region,
          ],
          { allowFailure: true, inherit: true },
        );
      }

      deleteLogGroups(stackName, region);
    }
  }

  return ok;
}

async function reapAzure(options: ReapOptions): Promise<boolean> {
  if (!commandExists('az')) {
    console.warn('[azure] az CLI not found, skipping');

    return true;
  }

  const listed = runResult(
    'az',
    [
      'group',
      'list',
      '--tag',
      'project=serverless-adapter-e2e',
      '--query',
      '[].{name:name, tags:tags}',
      '--output',
      'json',
    ],
    { allowFailure: true },
  );

  if (!listed.ok) {
    console.warn('[azure] could not list resource groups');

    return false;
  }

  const groups = JSON.parse(listed.output) as Array<{
    name: string;
    tags?: Record<string, string>;
  }>;
  const now = new Date();

  for (const group of groups) {
    const expireAt = group.tags?.['expire-at'];

    if (!shouldReap(group.name, expireAt, now)) continue;

    if (options.dryRun) {
      console.log(`[azure] would delete resource group ${group.name}`);
      continue;
    }

    console.log(`[azure] deleting resource group ${group.name}`);
    run('az', ['group', 'delete', '--name', group.name, '--yes', '--no-wait'], {
      allowFailure: true,
      inherit: true,
    });
  }

  return true;
}

async function reapDo(options: ReapOptions): Promise<boolean> {
  if (!commandExists('doctl')) {
    console.warn('[do] doctl not found, skipping');

    return true;
  }

  const listed = runResult(
    'doctl',
    ['serverless', 'functions', 'list', '--output', 'json'],
    { allowFailure: true },
  );

  if (!listed.ok) {
    console.warn('[do] could not list functions');

    return false;
  }

  const names = new Set<string>();

  for (const match of listed.output.matchAll(
    /sae2e-[0-9]{8}t[0-9]{6}z-[0-9a-f]{6}/g,
  ))
    names.add(match[0]);

  const now = new Date();

  for (const name of names) {
    if (!shouldReap(name, undefined, now)) continue;

    if (options.dryRun) {
      console.log(`[do] would undeploy ${PACKAGE}/${name}`);
      continue;
    }

    console.log(`[do] undeploying ${PACKAGE}/${name}`);
    run('doctl', ['serverless', 'undeploy', PACKAGE, name], {
      allowFailure: true,
      inherit: true,
    });
  }

  return true;
}

/**
 * A tagged resource is reaped once its own expiry passes. An untagged one is
 * reaped only when the run id in its name is old enough that no in-flight run
 * could own it.
 */
function shouldReap(
  name: string,
  expireAt: string | undefined,
  now: Date,
): boolean {
  if (expireAt) return isExpired(expireAt, now);

  const runId = name.replace(/^sae2e-/, '');
  const createdAt = runIdTime(runId);

  if (!createdAt) return false;

  return now.getTime() - createdAt.getTime() > STALE_MS;
}

function stackExpireAt(stackName: string, region: string): string | undefined {
  const described = runResult(
    'aws',
    [
      'cloudformation',
      'describe-stacks',
      '--stack-name',
      stackName,
      '--query',
      'Stacks[0].Tags',
      '--output',
      'json',
      '--region',
      region,
    ],
    { allowFailure: true },
  );

  if (!described.ok) return undefined;

  const tags = JSON.parse(described.output) as Array<{
    Key: string;
    Value: string;
  }>;

  return tags.find(tag => tag.Key === 'expire-at')?.Value;
}

function deleteLogGroups(stackName: string, region: string): void {
  const prefix = `/aws/lambda/${stackName}`;
  const listed = runResult(
    'aws',
    [
      'logs',
      'describe-log-groups',
      '--log-group-name-prefix',
      prefix,
      '--query',
      'logGroups[].logGroupName',
      '--output',
      'json',
      '--region',
      region,
    ],
    { allowFailure: true },
  );

  if (!listed.ok) return;

  const names = JSON.parse(listed.output) as string[];

  for (const name of names) {
    run(
      'aws',
      [
        'logs',
        'delete-log-group',
        '--log-group-name',
        name,
        '--region',
        region,
      ],
      { allowFailure: true },
    );
  }
}

function awsRegions(): string[] {
  const value =
    process.env.E2E_AWS_REGIONS ??
    process.env.AWS_REGION ??
    process.env.AWS_DEFAULT_REGION ??
    'us-east-1';

  return value
    .split(',')
    .map(region => region.trim())
    .filter(Boolean);
}

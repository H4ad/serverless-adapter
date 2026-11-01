import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { commandExists, run, runResult } from '@e2e/core/lib/shell';
import { EDGE_REGION, distributionComment } from './names';

export interface EdgeDistribution {
  id: string;
  comment: string;
  enabled: boolean;
}

interface DistributionConfigResponse {
  ETag: string;
  DistributionConfig: Record<string, unknown>;
}

/**
 * Deletes the stack and, if CloudFormation refuses, removes the distribution
 * by hand and tries again. A viewer-response function keeps a replica in every
 * edge location for a while, so the function version itself can outlive the
 * first attempt. That is why the reaper calls this again every six hours
 * instead of treating a failed delete as fatal.
 */
export function deleteEdgeStack(
  stackName: string,
  runId: string,
  region = EDGE_REGION,
): void {
  deleteStack(stackName, region);

  if (!stackExists(stackName, region)) return;

  console.warn(
    `[edge] ${stackName} is still present after the first delete, removing the distribution and retrying`,
  );

  for (const distribution of listDistributions(runId, region))
    deleteDistribution(distribution.id, region);

  deleteStack(stackName, region);
}

export function deleteStack(stackName: string, region = EDGE_REGION): void {
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

export function stackExists(stackName: string, region = EDGE_REGION): boolean {
  const described = runResult(
    'aws',
    [
      'cloudformation',
      'describe-stacks',
      '--stack-name',
      stackName,
      '--region',
      region,
    ],
    { allowFailure: true },
  );

  return described.ok;
}

export function listDistributions(
  runId: string,
  region = EDGE_REGION,
): EdgeDistribution[] {
  const listed = runResult(
    'aws',
    [
      'cloudfront',
      'list-distributions',
      '--query',
      `DistributionList.Items[?Comment=='${distributionComment(runId)}'].{id:Id,comment:Comment,enabled:Enabled}`,
      '--output',
      'json',
      '--region',
      region,
    ],
    { allowFailure: true },
  );

  if (!listed.ok) return [];

  try {
    return JSON.parse(listed.output) as EdgeDistribution[];
  } catch {
    return [];
  }
}

/**
 * A distribution has to be disabled and fully deployed before CloudFront
 * accepts the delete. Both waits are measured in minutes, which is the real
 * reason this module belongs to a release job and not to the weekly matrix.
 */
export function deleteDistribution(id: string, region = EDGE_REGION): void {
  const config = readConfig(id, region);

  if (!config) return;

  if (config.DistributionConfig.Enabled === true) {
    console.log(`[edge] disabling distribution ${id}`);

    writeConfig(config, 'disabled');

    run(
      'aws',
      [
        'cloudfront',
        'update-distribution',
        '--id',
        id,
        '--if-match',
        config.ETag,
        '--distribution-config',
        `file://${configPath('disabled')}`,
        '--region',
        region,
      ],
      { allowFailure: true, inherit: true },
    );

    run(
      'aws',
      [
        'cloudfront',
        'wait',
        'distribution-deployed',
        '--id',
        id,
        '--region',
        region,
      ],
      { allowFailure: true, inherit: true },
    );
  }

  const current = readConfig(id, region);

  if (!current) return;

  console.log(`[edge] deleting distribution ${id}`);

  run(
    'aws',
    [
      'cloudfront',
      'delete-distribution',
      '--id',
      id,
      '--if-match',
      current.ETag,
      '--region',
      region,
    ],
    { allowFailure: true, inherit: true },
  );
}

/**
 * Lambda@Edge writes a log group in every region where a replica ran, so the
 * sweep is best effort and the leftover check ignores log groups.
 */
export function deleteLogGroups(regions: string[]): void {
  if (!commandExists('aws')) return;

  for (const region of regions) {
    const listed = runResult(
      'aws',
      [
        'logs',
        'describe-log-groups',
        '--log-group-name-prefix',
        '/aws/lambda/sae2e-edge-',
        '--query',
        'logGroups[].logGroupName',
        '--output',
        'json',
        '--region',
        region,
      ],
      { allowFailure: true },
    );

    if (!listed.ok) continue;

    for (const name of JSON.parse(listed.output) as string[]) {
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
}

function readConfig(
  id: string,
  region: string,
): DistributionConfigResponse | undefined {
  const described = runResult(
    'aws',
    [
      'cloudfront',
      'get-distribution-config',
      '--id',
      id,
      '--output',
      'json',
      '--region',
      region,
    ],
    { allowFailure: true },
  );

  if (!described.ok) return undefined;

  try {
    return JSON.parse(described.output) as DistributionConfigResponse;
  } catch {
    return undefined;
  }
}

function writeConfig(config: DistributionConfigResponse, suffix: string): void {
  const body = { ...config.DistributionConfig, Enabled: false };

  writeFileSync(configPath(suffix), JSON.stringify(body));
}

function configPath(suffix: string): string {
  return join(tmpdir(), `sae2e-edge-${suffix}.json`);
}

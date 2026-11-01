import { loadState } from '@e2e/core/lib/state';
import { runResult } from '@e2e/core/lib/shell';
import type { RunState } from '@e2e/core/lib/types';
import { logGroupNames } from './logs';
import { regionFromEnv } from './names';

/**
 * Called after `down`. Anything still findable by name is a leak, and a leak
 * is the only thing that costs money after the run.
 */
export async function leftovers(
  state: RunState | undefined = loadState('aws'),
): Promise<string[]> {
  if (!state) return [];

  const region = state.region || regionFromEnv();
  const stackName = state.resources.stackName;
  const functionName = state.resources.functionName;
  const bucketName = state.resources.bucketName;
  const found: string[] = [];

  if (stackName) {
    const stack = runResult(
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

    if (stack.ok) found.push(`cloudformation stack ${stackName}`);
  }

  const logPrefix = functionName
    ? `/aws/lambda/${functionName}`
    : `/aws/lambda/${stackName}`;
  const groups = logGroupNames(logPrefix, region);

  if (groups.length > 0) found.push(`log groups ${groups.join(', ')}`);

  if (bucketName) {
    const bucket = runResult(
      'aws',
      ['s3api', 'head-bucket', '--bucket', bucketName, '--region', region],
      { allowFailure: true },
    );

    if (bucket.ok) found.push(`s3 bucket ${bucketName}`);
  }

  return found;
}

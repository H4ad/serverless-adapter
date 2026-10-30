import { clearState, loadState } from '../lib/state';
import { run } from '../lib/shell';
import type { RunState } from '../lib/types';
import { logGroupNames } from './logs';
import { regionFromEnv } from './names';

/**
 * Order matters: CloudFormation refuses to delete a non-empty bucket, so empty
 * it first. The log group is created by the service, not the stack, so it is
 * deleted explicitly.
 */
export async function down(
  state: RunState | undefined = loadState('aws'),
): Promise<void> {
  if (!state) {
    console.warn(
      '[aws] no state file. Nothing to delete by name; run e2e:reap to sweep expired stacks.',
    );

    return;
  }

  const region = state.region || regionFromEnv();
  const stackName = state.resources.stackName;
  const bucketName = state.resources.bucketName;
  const functionName = state.resources.functionName;

  if (bucketName) {
    run(
      'aws',
      ['s3', 'rm', `s3://${bucketName}`, '--recursive', '--region', region],
      { allowFailure: true, inherit: true },
    );
  }

  if (stackName) {
    run(
      'sam',
      ['delete', '--stack-name', stackName, '--no-prompts', '--region', region],
      { allowFailure: true, inherit: true },
    );
  }

  const logPrefix = functionName
    ? `/aws/lambda/${functionName}`
    : `/aws/lambda/${stackName}`;

  for (const logGroup of logGroupNames(logPrefix, region)) {
    run(
      'aws',
      [
        'logs',
        'delete-log-group',
        '--log-group-name',
        logGroup,
        '--region',
        region,
      ],
      { allowFailure: true },
    );
  }

  const artifactBucket = state.resources.artifactBucket;

  if (artifactBucket) {
    run(
      'aws',
      [
        's3',
        'rm',
        `s3://${artifactBucket}/${state.runId}`,
        '--recursive',
        '--region',
        region,
      ],
      { allowFailure: true },
    );
  }

  clearState('aws');
  console.log(`[aws] teardown finished for ${state.runId}`);
}

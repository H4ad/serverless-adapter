import { loadState } from '../lib/state';
import { runResult } from '../lib/shell';
import type { RunState } from '../lib/types';
import { listDistributions, stackExists } from './cleanup';
import { EDGE_REGION } from './names';

/**
 * Log groups are deliberately ignored here: Lambda@Edge writes them in every
 * region where a replica handled a request, so a missing group is not evidence
 * of a leak and an empty group costs nothing.
 */
export async function leftovers(
  state: RunState | undefined = loadState('edge'),
): Promise<string[]> {
  if (!state) return [];

  const region = state.region || EDGE_REGION;
  const stackName = state.resources.stackName;
  const found: string[] = [];

  if (stackName && stackExists(stackName, region))
    found.push(`cloudformation stack ${stackName}`);

  for (const distribution of listDistributions(state.runId, region))
    found.push(`cloudfront distribution ${distribution.id}`);

  const functionName = state.resources.originFunctionName;

  if (functionName) {
    const foundFunction = runResult(
      'aws',
      [
        'lambda',
        'get-function',
        '--function-name',
        functionName,
        '--region',
        region,
      ],
      { allowFailure: true },
    );

    if (foundFunction.ok) found.push(`lambda function ${functionName}`);
  }

  return found;
}

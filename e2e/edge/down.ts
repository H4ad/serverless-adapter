import { clearState, loadState } from '../lib/state';
import type { RunState } from '../lib/types';
import {
  deleteEdgeStack,
  deleteLogGroups,
  listDistributions,
  stackExists,
} from './cleanup';
import { EDGE_REGION } from './names';

/**
 * Teardown can take half an hour: the distribution has to be disabled, that
 * change has to reach every edge location, and only then can it be deleted.
 * A viewer function replica can also outlive the stack, in which case the
 * state file stays so the reaper can finish the job later.
 */
export async function down(
  state: RunState | undefined = loadState('edge'),
): Promise<void> {
  if (!state) {
    console.warn(
      '[edge] no state file. Nothing to delete by name; run e2e:reap to sweep expired stacks.',
    );

    return;
  }

  const region = state.region || EDGE_REGION;
  const stackName = state.resources.stackName;

  if (stackName) deleteEdgeStack(stackName, state.runId, region);

  const remaining = listDistributions(state.runId, region);

  for (const distribution of remaining) {
    console.warn(
      `[edge] distribution ${distribution.id} is still there, the reaper will retry`,
    );
  }

  deleteLogGroups([region]);

  if (stackName && stackExists(stackName, region)) {
    console.warn(
      `[edge] ${stackName} did not delete cleanly. A replicated Lambda@Edge version can block it for hours; the reaper retries every six hours.`,
    );

    return;
  }

  clearState('edge');
  console.log(`[edge] teardown finished for ${state.runId}`);
}

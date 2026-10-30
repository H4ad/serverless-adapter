import { rmSync } from 'node:fs';
import { clearState, loadState } from '../lib/state';
import { run } from '../lib/shell';
import type { RunState } from '../lib/types';
import { PACKAGE, projectDirectory } from './names';

export async function down(
  state: RunState | undefined = loadState('do'),
): Promise<void> {
  if (!state) {
    console.warn(
      '[do] no state file. Nothing to undeploy by name; run e2e:reap to sweep old functions.',
    );

    return;
  }

  const functionName = state.resources.functionName;

  if (functionName) {
    run('doctl', ['serverless', 'undeploy', PACKAGE, functionName], {
      allowFailure: true,
      inherit: true,
    });
  }

  rmSync(projectDirectory(), { recursive: true, force: true });
  clearState('do');
  console.log(`[do] teardown finished for ${state.runId}`);
}

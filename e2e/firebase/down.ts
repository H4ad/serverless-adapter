import { rmSync } from 'node:fs';
import { clearState, loadState } from '../lib/state';
import { run } from '../lib/shell';
import type { RunState } from '../lib/types';
import { BUILD_DIR } from './names';

export async function down(
  state: RunState | undefined = loadState('firebase'),
): Promise<void> {
  if (!state) {
    console.warn(
      '[firebase] no state file. Nothing to delete by name; run e2e:reap to sweep expired functions.',
    );

    return;
  }

  const functionName = state.resources.functionName;
  const project = state.resources.project;

  if (functionName && project) {
    // The delete runs from the build directory because the CLI expects a
    // project context there. A deploy that never created the function is why
    // the failure is allowed through.
    run(
      'firebase',
      [
        'functions:delete',
        functionName,
        '--project',
        project,
        '--force',
        '--non-interactive',
      ],
      { cwd: BUILD_DIR, allowFailure: true, inherit: true },
    );
  }

  rmSync(BUILD_DIR, { recursive: true, force: true });
  clearState('firebase');
  console.log(`[firebase] teardown finished for ${state.runId}`);
}

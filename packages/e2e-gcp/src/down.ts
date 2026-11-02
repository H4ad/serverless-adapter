import { clearState, loadState } from '@e2e/core/lib/state';
import { run } from '@e2e/core/lib/shell';
import type { RunState } from '@e2e/core/lib/types';

export async function down(
  state: RunState | undefined = loadState('gcp'),
): Promise<void> {
  if (!state) {
    console.warn(
      '[gcp] no state file. Nothing to delete by name; run e2e:reap to sweep expired functions.',
    );

    return;
  }

  const functionName = state.resources.functionName;

  if (functionName) {
    const args = [
      'functions',
      'delete',
      functionName,
      `--region=${state.region}`,
      '--quiet',
    ];

    if (state.resources.project)
      args.push(`--project=${state.resources.project}`);

    run('gcloud', args, { allowFailure: true, inherit: true });
  } else {
    console.warn(
      '[gcp] the state file has no function name. Run e2e:reap to sweep expired functions.',
    );
  }

  clearState('gcp');
  console.log(`[gcp] teardown finished for ${state.runId}`);
}

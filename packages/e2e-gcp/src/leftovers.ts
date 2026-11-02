import { loadState } from '@e2e/core/lib/state';
import { runResult } from '@e2e/core/lib/shell';
import type { RunState } from '@e2e/core/lib/types';

export async function leftovers(
  state: RunState | undefined = loadState('gcp'),
): Promise<string[]> {
  if (!state) return [];

  const functionName = state.resources.functionName;
  const project = state.resources.project;
  if (!functionName || !project) return [];

  // describe fails when the function is gone, which is the answer wanted here,
  // and it reads the name rather than a table so a format change cannot turn a
  // leak into a pass.
  const described = runResult(
    'gcloud',
    [
      'functions',
      'describe',
      functionName,
      `--region=${state.region}`,
      `--project=${project}`,
      '--format=value(name)',
    ],
    { allowFailure: true },
  );

  if (!described.ok) return [];

  return [`cloud function ${functionName}`];
}

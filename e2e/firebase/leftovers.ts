import { loadState } from '../lib/state';
import { runResult } from '../lib/shell';
import type { RunState } from '../lib/types';
import { REGION } from './names';

export async function leftovers(
  state: RunState | undefined = loadState('firebase'),
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
      `--region=${REGION}`,
      `--project=${project}`,
      '--format=value(name)',
    ],
    { allowFailure: true },
  );

  if (!described.ok) return [];

  return [`cloud function ${functionName}`];
}

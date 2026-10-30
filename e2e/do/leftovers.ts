import { loadState } from '../lib/state';
import { runResult } from '../lib/shell';
import type { RunState } from '../lib/types';

export async function leftovers(
  state: RunState | undefined = loadState('do'),
): Promise<string[]> {
  if (!state) return [];

  const functionName = state.resources.functionName;
  if (!functionName) return [];

  // JSON rather than a table format, so a column rename in doctl does not
  // silently turn a leak into a pass.
  const listed = runResult(
    'doctl',
    ['serverless', 'functions', 'list', '--output', 'json'],
    { allowFailure: true },
  );

  if (!listed.ok) return [];

  return listed.output.includes(functionName)
    ? [`digitalocean function ${functionName}`]
    : [];
}

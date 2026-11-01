import { loadState } from '@e2e/core/lib/state';
import { run } from '@e2e/core/lib/shell';
import type { RunState } from '@e2e/core/lib/types';

export async function leftovers(
  state: RunState | undefined = loadState('azure'),
): Promise<string[]> {
  if (!state) return [];

  const resourceGroup = state.resources.resourceGroup;
  if (!resourceGroup) return [];

  const exists = run('az', ['group', 'exists', '--name', resourceGroup]).trim();

  return exists === 'true' ? [`resource group ${resourceGroup}`] : [];
}

import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { moduleDir } from '@e2e/core/lib/paths';
import { clearState, loadState } from '@e2e/core/lib/state';
import { run } from '@e2e/core/lib/shell';
import type { RunState } from '@e2e/core/lib/types';

/**
 * The resource group is the whole unit, so one delete removes the function
 * app, the plan and the storage account. OpenTofu state is removed afterwards
 * because the next run starts from scratch.
 */
export async function down(
  state: RunState | undefined = loadState('azure'),
): Promise<void> {
  if (!state) {
    console.warn(
      '[azure] no state file. Nothing to delete by name; run e2e:reap to sweep expired resource groups.',
    );

    return;
  }

  const resourceGroup = state.resources.resourceGroup;

  if (resourceGroup) {
    run('az', ['group', 'delete', '--name', resourceGroup, '--yes'], {
      allowFailure: true,
      inherit: true,
    });
  }

  const packageDir = join(moduleDir(import.meta), '..');

  rmSync(join(packageDir, '.terraform'), { recursive: true, force: true });
  rmSync(join(packageDir, 'terraform.tfstate'), { force: true });
  rmSync(join(packageDir, 'terraform.tfstate.backup'), { force: true });

  clearState('azure');
  console.log(`[azure] teardown finished for ${state.runId}`);
}

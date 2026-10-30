import { rmSync } from 'node:fs';
import { clearState, loadState } from '../lib/state';
import { run } from '../lib/shell';
import type { RunState } from '../lib/types';

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

  rmSync('e2e/azure/.terraform', { recursive: true, force: true });
  rmSync('e2e/azure/terraform.tfstate', { force: true });
  rmSync('e2e/azure/terraform.tfstate.backup', { force: true });

  clearState('azure');
  console.log(`[azure] teardown finished for ${state.runId}`);
}

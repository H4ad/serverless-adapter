import { checkHttpCases } from '@e2e/core/cases';
import { waitForHealth } from '@e2e/core/lib/smoke';
import type { RunState } from '@e2e/core/lib/types';

export async function test(state: RunState): Promise<boolean> {
  const baseUrl = state.endpoints.baseUrl;

  if (!baseUrl) {
    console.error('[firebase] no base URL in the state file');

    return false;
  }

  if (!(await waitForHealth('firebase', baseUrl, 180_000))) return false;

  return checkHttpCases('http: firebase', baseUrl, 'firebase');
}

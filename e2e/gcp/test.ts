import { checkHttpCases } from '../cases';
import { waitForHealth } from '../lib/smoke';
import type { RunState } from '../lib/types';

export async function test(state: RunState): Promise<boolean> {
  const baseUrl = state.endpoints.baseUrl;

  if (!baseUrl) {
    console.error('[gcp] no base URL in the state file');

    return false;
  }

  if (!(await waitForHealth('gcp', baseUrl, 180_000))) return false;

  return checkHttpCases('http: gcp', baseUrl, 'gcp');
}

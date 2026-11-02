import { checkHttpCases } from '@e2e/core/cases';
import { waitForHealth } from '@e2e/core/lib/smoke';
import type { RunState } from '@e2e/core/lib/types';

/**
 * A new distribution answers as soon as CloudFormation returns, but the edge
 * association only exists in the locations that have received it. Ten minutes
 * is the documented worst case for a viewer location.
 */
const PROPAGATION_TIMEOUT_MS = 10 * 60_000;

export async function test(state: RunState): Promise<boolean> {
  const baseUrl = state.endpoints.baseUrl;

  if (!baseUrl) {
    console.error('[edge] no base URL in the state file');

    return false;
  }

  if (!(await waitForHealth('edge', baseUrl, PROPAGATION_TIMEOUT_MS)))
    return false;

  return checkHttpCases('http: edge origin-request', baseUrl, 'edge');
}

import { requireEnv } from '../lib/shell';

export const PROJECT_TAG = 'serverless-adapter-e2e';

export const NAME_PREFIX = 'sae2e-';

export const DIST_DIR = 'e2e/gcp/dist';

/**
 * Cloud Function names accept lowercase letters, digits and hyphens, start with
 * a letter and stop at 63 characters. The run id is 23 characters, so the
 * prefix is all the normalisation the name needs.
 */
export function functionNameFor(runId: string): string {
  return `${NAME_PREFIX}${runId.toLowerCase()}`;
}

export function regionFromEnv(): string {
  return process.env.GCP_REGION ?? 'us-central1';
}

export function projectFromEnv(): string {
  return requireEnv(
    'GCP_PROJECT',
    'Set GCP_PROJECT to the sandbox project id.',
  );
}

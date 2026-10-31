import { requireEnv } from '../lib/shell';

export const NAME_PREFIX = 'sae2e-';

/** Firebase Functions v2 defaults to this region when none is set. */
export const REGION = 'us-central1';

export const BUILD_DIR = 'e2e/firebase/build';

export const SOURCE_DIR = 'e2e/firebase/build/functions';

/**
 * Firebase v2 function ids are lowercase letters, digits and hyphens, must
 * start with a letter, and stop at 63 characters. The run id is 23 characters,
 * so the prefix is all the normalisation the name needs.
 */
export function functionNameFor(runId: string): string {
  return `${NAME_PREFIX}${runId.toLowerCase()}`;
}

export function projectFromEnv(): string {
  return requireEnv(
    'FIREBASE_PROJECT',
    'Set FIREBASE_PROJECT to the sandbox project id.',
  );
}

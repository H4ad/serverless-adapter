import { join } from 'node:path';
import { moduleDir } from '@e2e/core/lib/paths';

export const PROJECT_TAG = 'serverless-adapter-e2e';

export const NAME_PREFIX = 'sae2e-';

const PACKAGE_DIR = join(moduleDir(import.meta), '..');

export const TEMPLATE_PATH = join(PACKAGE_DIR, 'template.yaml');

export const DIST_DIR = join(PACKAGE_DIR, 'dist');

export const BUNDLE_PATH = join(DIST_DIR, 'lambda.js');

export const ZIP_PATH = join(DIST_DIR, 'lambda.zip');

export function stackNameFor(runId: string): string {
  return `${NAME_PREFIX}${runId.toLowerCase()}`;
}

export function bucketNameFor(runId: string): string {
  return `${NAME_PREFIX}${runId.toLowerCase()}`;
}

export function regionFromEnv(): string {
  return (
    process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? 'us-east-1'
  );
}

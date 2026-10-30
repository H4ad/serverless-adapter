export const PROJECT_TAG = 'serverless-adapter-e2e';

export const NAME_PREFIX = 'sae2e-';

export const TEMPLATE_PATH = 'e2e/aws/template.yaml';

export const DIST_DIR = 'e2e/aws/dist';

export const BUNDLE_PATH = `${DIST_DIR}/lambda.js`;

export const ZIP_PATH = `${DIST_DIR}/lambda.zip`;

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

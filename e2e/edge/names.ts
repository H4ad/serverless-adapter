export const PROJECT_TAG = 'serverless-adapter-e2e';

export const NAME_PREFIX = 'sae2e-edge-';

export const TEMPLATE_PATH = 'e2e/edge/template.yaml';

export const DIST_DIR = 'e2e/edge/dist';

export const BUNDLE_PATH = `${DIST_DIR}/index.js`;

export const ZIP_PATH = `${DIST_DIR}/lambda.zip`;

/**
 * Lambda@Edge only accepts functions created in us-east-1. The replicas then
 * run in the region closest to the viewer, so the function itself never moves.
 */
export const EDGE_REGION = 'us-east-1';

export function stackNameFor(runId: string): string {
  return `${NAME_PREFIX}${runId.toLowerCase()}`;
}

export function bucketNameFor(runId: string): string {
  return `${NAME_PREFIX}${runId.toLowerCase()}`;
}

export function originFunctionFor(runId: string): string {
  return `${NAME_PREFIX}origin-${runId.toLowerCase()}`;
}

export function distributionComment(runId: string): string {
  return `${NAME_PREFIX}${runId.toLowerCase()}`;
}

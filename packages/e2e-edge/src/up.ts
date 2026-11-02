import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { ensureArtifactBucket } from '@e2e/aws/up';
import { moduleDir } from '@e2e/core/lib/paths';
import { createRunId, expiry } from '@e2e/core/lib/run';
import { requireCommand, run } from '@e2e/core/lib/shell';
import { saveState } from '@e2e/core/lib/state';
import type { RunState } from '@e2e/core/lib/types';
import {
  BUNDLE_PATH,
  DIST_DIR,
  EDGE_REGION,
  PROJECT_TAG,
  TEMPLATE_PATH,
  ZIP_PATH,
  bucketNameFor,
  stackNameFor,
} from './names';

interface StackOutput {
  OutputKey: string;
  OutputValue: string;
}

export async function up(): Promise<RunState> {
  requireCommand('aws', 'Install the AWS CLI v2 and configure credentials.');
  requireCommand('sam', 'Install the AWS SAM CLI.');
  requireCommand('zip', 'Install zip, for example apt install zip.');
  requireCommand('npx', 'Install Node.js and npm.');

  const runId = createRunId();
  const expireAt = expiry();
  const region = EDGE_REGION;
  const stackName = stackNameFor(runId);
  const originBucketName = bucketNameFor(runId);

  const state: RunState = {
    cloud: 'edge',
    runId,
    createdAt: new Date().toISOString(),
    expireAt,
    region,
    endpoints: {},
    resources: { stackName, bucketName: originBucketName },
  };

  saveState(state);

  const artifactBucket = ensureArtifactBucket(region);
  state.resources.artifactBucket = artifactBucket;
  saveState(state);

  buildBundle();

  const codeKey = `${runId}/lambda.zip`;

  run(
    'aws',
    [
      's3',
      'cp',
      ZIP_PATH,
      `s3://${artifactBucket}/${codeKey}`,
      '--region',
      region,
    ],
    { inherit: true },
  );

  run(
    'sam',
    [
      'deploy',
      '--template-file',
      TEMPLATE_PATH,
      '--stack-name',
      stackName,
      '--s3-bucket',
      artifactBucket,
      '--s3-prefix',
      runId,
      '--capabilities',
      'CAPABILITY_IAM',
      '--parameter-overrides',
      `RunId=${runId.toLowerCase()}`,
      `ExpireAt=${expireAt}`,
      `CodeBucket=${artifactBucket}`,
      `CodeKey=${codeKey}`,
      `OriginBucketName=${originBucketName}`,
      '--tags',
      `project=${PROJECT_TAG}`,
      `run-id=${runId}`,
      `expire-at=${expireAt}`,
      '--no-confirm-changeset',
      '--no-fail-on-empty-changeset',
      '--region',
      region,
    ],
    { inherit: true },
  );

  const outputs = readOutputs(stackName, region);

  state.endpoints = { baseUrl: trimTrailingSlash(outputs.BaseUrl) };
  state.resources = {
    ...state.resources,
    distributionId: outputs.DistributionId,
    originFunctionName: outputs.OriginFunctionName,
    codeKey,
  };

  saveState(state);

  console.log(
    `\n[edge] stack ${stackName} is up at ${state.endpoints.baseUrl}`,
  );
  console.log(
    '[edge] the association takes a few minutes to reach every edge location',
  );

  return state;
}

function buildBundle(): void {
  rmSync(DIST_DIR, { recursive: true, force: true });
  mkdirSync(DIST_DIR, { recursive: true });

  run(
    'npx',
    [
      'esbuild',
      join(moduleDir(import.meta), 'function.ts'),
      '--bundle',
      '--platform=node',
      '--target=node22',
      '--format=cjs',
      `--outfile=${BUNDLE_PATH}`,
      '--external:@aws-sdk/*',
    ],
    { inherit: true },
  );

  run('zip', ['-j', '-q', ZIP_PATH, BUNDLE_PATH], { inherit: true });
}

function readOutputs(
  stackName: string,
  region: string,
): Record<string, string> {
  const raw = run('aws', [
    'cloudformation',
    'describe-stacks',
    '--stack-name',
    stackName,
    '--query',
    'Stacks[0].Outputs',
    '--output',
    'json',
    '--region',
    region,
  ]);

  const outputs = JSON.parse(raw) as StackOutput[];

  return Object.fromEntries(
    outputs.map(output => [output.OutputKey, output.OutputValue]),
  );
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

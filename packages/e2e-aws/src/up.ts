import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { moduleDir } from '@e2e/core/lib/paths';
import { createRunId, expiry } from '@e2e/core/lib/run';
import { requireCommand, run, runResult } from '@e2e/core/lib/shell';
import { saveState } from '@e2e/core/lib/state';
import type { RunState } from '@e2e/core/lib/types';
import {
  BUNDLE_PATH,
  DIST_DIR,
  PROJECT_TAG,
  TEMPLATE_PATH,
  ZIP_PATH,
  bucketNameFor,
  regionFromEnv,
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
  const region = regionFromEnv();
  const stackName = stackNameFor(runId);
  const bucketName = bucketNameFor(runId);

  const state: RunState = {
    cloud: 'aws',
    runId,
    createdAt: new Date().toISOString(),
    expireAt,
    region,
    endpoints: {},
    resources: { stackName, bucketName },
  };

  // Saved before the first cloud call so a failed deploy still has a name the
  // teardown can act on.
  saveState(state);

  const artifactBucket = ensureArtifactBucket(region);
  state.resources.artifactBucket = artifactBucket;
  saveState(state);

  buildBundle();

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
      `RunId=${runId}`,
      `ExpireAt=${expireAt}`,
      `BucketName=${bucketName}`,
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

  state.endpoints = {
    httpApi: trimTrailingSlash(outputs.HttpApiBaseUrl),
    restApi: trimTrailingSlash(outputs.RestApiBaseUrl),
    alb: trimTrailingSlash(outputs.AlbBaseUrl),
    functionUrl: trimTrailingSlash(outputs.FunctionUrl),
  };

  state.resources = {
    ...state.resources,
    functionName: outputs.FunctionName,
    logGroup: `/aws/lambda/${outputs.FunctionName}`,
    queueUrl: outputs.QueueUrl,
    topicArn: outputs.TopicArn,
    tableName: outputs.TableName,
  };

  saveState(state);

  console.log(`\n[aws] stack ${stackName} is up`);
  for (const [name, url] of Object.entries(state.endpoints))
    console.log(`[aws] ${name}: ${url}`);

  return state;
}

export function ensureArtifactBucket(region: string): string {
  const account = run('aws', [
    'sts',
    'get-caller-identity',
    '--query',
    'Account',
    '--output',
    'text',
    '--region',
    region,
  ]).trim();

  const name = (
    process.env.E2E_ARTIFACT_BUCKET ?? `sae2e-artifacts-${account}-${region}`
  ).toLowerCase();

  const exists = runResult(
    'aws',
    ['s3api', 'head-bucket', '--bucket', name, '--region', region],
    { allowFailure: true },
  ).ok;

  if (!exists) {
    const args = [
      's3api',
      'create-bucket',
      '--bucket',
      name,
      '--region',
      region,
    ];

    if (region !== 'us-east-1') {
      args.push(
        '--create-bucket-configuration',
        `LocationConstraint=${region}`,
      );
    }

    run('aws', args, { inherit: true });
    run(
      'aws',
      [
        's3api',
        'put-public-access-block',
        '--bucket',
        name,
        '--public-access-block-configuration',
        'BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true',
        '--region',
        region,
      ],
      { inherit: true },
    );
  }

  // Artifacts disappear on their own even if a teardown never runs.
  const lifecycle = JSON.stringify({
    Rules: [
      {
        ID: 'expire-artifacts',
        Status: 'Enabled',
        Filter: { Prefix: '' },
        Expiration: { Days: 1 },
        AbortIncompleteMultipartUpload: { DaysAfterInitiation: 1 },
      },
    ],
  });

  run(
    'aws',
    [
      's3api',
      'put-bucket-lifecycle-configuration',
      '--bucket',
      name,
      '--lifecycle-configuration',
      lifecycle,
      '--region',
      region,
    ],
    { inherit: true },
  );

  return name;
}

function buildBundle(): void {
  rmSync(DIST_DIR, { recursive: true, force: true });
  mkdirSync(DIST_DIR, { recursive: true });

  run(
    'npx',
    [
      'esbuild',
      join(moduleDir(import.meta), 'lambda.ts'),
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

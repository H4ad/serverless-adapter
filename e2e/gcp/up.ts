import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRunId, expiry } from '../lib/run';
import { requireCommand, run, runResult } from '../lib/shell';
import { saveState } from '../lib/state';
import type { RunState } from '../lib/types';
import {
  DIST_DIR,
  PROJECT_TAG,
  functionNameFor,
  projectFromEnv,
  regionFromEnv,
} from './names';

export async function up(): Promise<RunState> {
  requireCommand(
    'gcloud',
    'Install the Google Cloud CLI and run gcloud auth login first.',
  );
  requireCommand('npx', 'Install Node.js and npm.');

  const runId = createRunId();
  const expireAt = expiry();
  const region = regionFromEnv();
  const project = projectFromEnv();
  const functionName = functionNameFor(runId);

  const state: RunState = {
    cloud: 'gcp',
    runId,
    createdAt: new Date().toISOString(),
    expireAt,
    region,
    endpoints: {},
    resources: { project, functionName },
  };

  // Saved before the first cloud call so a failed deploy still leaves a name
  // the teardown can act on.
  saveState(state);

  buildFunction();

  run(
    'gcloud',
    [
      'functions',
      'deploy',
      functionName,
      // The library only supports gen2, so the flag is not optional here.
      '--gen2',
      '--runtime=nodejs22',
      `--region=${region}`,
      `--project=${project}`,
      `--source=${DIST_DIR}`,
      // The entry point and the name registered by function.ts must match.
      `--entry-point=${functionName}`,
      '--trigger-http',
      '--allow-unauthenticated',
      '--memory=256MB',
      '--timeout=60s',
      '--max-instances=2',
      // functions deploy exposes labels only through the diff flags.
      `--update-labels=${labels(runId, expireAt)}`,
      '--quiet',
    ],
    { inherit: true },
  );

  const baseUrl = resolveUrl(project, region, functionName);

  state.endpoints = { baseUrl };
  saveState(state);

  console.log(`\n[gcp] ${functionName} is up at ${baseUrl}`);

  return state;
}

/**
 * The runtime installs the bundle and reads main from package.json, and the
 * directory is rebuilt from scratch so a file from an earlier run cannot end up
 * in the deployment.
 */
function buildFunction(): void {
  rmSync(DIST_DIR, { recursive: true, force: true });
  mkdirSync(DIST_DIR, { recursive: true });

  run(
    'npx',
    [
      'esbuild',
      'e2e/gcp/function.ts',
      '--bundle',
      '--platform=node',
      '--target=node22',
      '--format=cjs',
      // esbuild takes a value flag only in the `--flag=value` form.
      `--outfile=${DIST_DIR}/index.js`,
      // A bundled copy of the framework would register the handler in its own
      // registry while the runtime entry point reads another, and the function
      // would fail to load. Requiring the installed copy keeps both on one
      // registry, so package.json below declares the dependency.
      '--external:@google-cloud/functions-framework',
    ],
    { inherit: true },
  );

  writeFileSync(
    `${DIST_DIR}/package.json`,
    JSON.stringify(
      {
        name: 'sae2e-gcp',
        private: true,
        type: 'commonjs',
        main: 'index.js',
        dependencies: { '@google-cloud/functions-framework': '3.4.2' },
      },
      null,
      2,
    ),
  );
}

/**
 * Label values accept lowercase letters, digits, '-' and '_' only, so the ISO
 * expiry is flattened before it reaches gcloud.
 */
function labels(runId: string, expireAt: string): string {
  return [
    `project=${PROJECT_TAG}`,
    `run-id=${runId.toLowerCase()}`,
    `expire-at=${labelSafe(expireAt)}`,
  ].join(',');
}

function labelSafe(expireAt: string): string {
  return expireAt
    .replace(/\.\d{3}Z$/, 'Z')
    .replace(/[-:]/g, '')
    .toLowerCase();
}

function resolveUrl(
  project: string,
  region: string,
  functionName: string,
): string {
  const described = runResult(
    'gcloud',
    [
      'functions',
      'describe',
      functionName,
      `--region=${region}`,
      `--project=${project}`,
      '--format=value(serviceConfig.uri)',
    ],
    { allowFailure: true },
  );

  const baseUrl = described.output.trim().replace(/\/+$/, '');

  if (described.ok && baseUrl) return baseUrl;

  throw new Error(
    `Deployed ${functionName} in ${region} but gcloud returned no serviceConfig.uri. Check that gcloud is authenticated against ${project}, or run npm run e2e:down -- --cloud gcp.`,
  );
}

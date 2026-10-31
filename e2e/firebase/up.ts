import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRunId, expiry } from '../lib/run';
import { requireCommand, run, runResult } from '../lib/shell';
import { saveState } from '../lib/state';
import type { RunState } from '../lib/types';
import {
  BUILD_DIR,
  REGION,
  SOURCE_DIR,
  functionNameFor,
  projectFromEnv,
} from './names';

export async function up(): Promise<RunState> {
  requireCommand(
    'firebase',
    'Install the Firebase CLI: npm i -g firebase-tools',
  );
  requireCommand('npx', 'Install Node.js and npm.');
  requireCommand('gcloud', 'Needed to read the deployed URL.');

  const runId = createRunId();
  const expireAt = expiry();
  const project = projectFromEnv();
  const functionName = functionNameFor(runId);

  const state: RunState = {
    cloud: 'firebase',
    runId,
    createdAt: new Date().toISOString(),
    expireAt,
    region: REGION,
    endpoints: {},
    resources: { project, functionName },
  };

  // Saved before the first cloud call so a failed deploy still leaves a name
  // the teardown and the reaper can act on.
  saveState(state);

  buildProject(functionName);

  run(
    'firebase',
    [
      'deploy',
      '--only',
      'functions',
      '--project',
      project,
      '--non-interactive',
      // A stale function left by an earlier failed run would otherwise block
      // the deploy behind a confirmation prompt.
      '--force',
    ],
    { cwd: BUILD_DIR, inherit: true },
  );

  const baseUrl = resolveUrl(project, functionName);

  state.endpoints = { baseUrl };
  saveState(state);

  console.log(`\n[firebase] ${functionName} is up at ${baseUrl}`);

  return state;
}

/**
 * `firebase deploy` refuses to run from the repo root, so every run writes a
 * minimal project with one function and deploys from there.
 */
function buildProject(functionName: string): void {
  rmSync(BUILD_DIR, { recursive: true, force: true });
  mkdirSync(SOURCE_DIR, { recursive: true });

  run(
    'npx',
    [
      'esbuild',
      'e2e/firebase/function.ts',
      '--bundle',
      '--platform=node',
      '--target=node22',
      '--format=cjs',
      // esbuild takes a value flag only in the `--flag=value` form.
      `--outfile=${join(SOURCE_DIR, 'bundle.js')}`,
      // The SDK's ESM build calls createRequire(import.meta.url), which is
      // undefined once esbuild emits CJS. Leaving it to node picks its CJS
      // build instead, and package.json declares the dependency.
      '--external:firebase-functions',
      '--external:firebase-functions/*',
    ],
    { inherit: true },
  );

  writeFileSync(
    join(BUILD_DIR, 'firebase.json'),
    JSON.stringify({ functions: { source: 'functions' } }),
  );

  writeFileSync(
    join(SOURCE_DIR, 'package.json'),
    JSON.stringify({
      name: 'sae2e-firebase',
      private: true,
      engines: { node: '22' },
      main: 'index.js',
      dependencies: { 'firebase-functions': '^7.0.0' },
    }),
  );

  // The export name carries the run id, so a run deploys next to an earlier
  // one instead of over it.
  writeFileSync(
    join(SOURCE_DIR, 'index.js'),
    [
      `const { createHandler } = require('./bundle.js');`,
      `exports['${functionName}'] = createHandler();`,
      '',
    ].join('\n'),
  );
}

function resolveUrl(project: string, functionName: string): string {
  const described = runResult(
    'gcloud',
    [
      'functions',
      'describe',
      functionName,
      `--region=${REGION}`,
      `--project=${project}`,
      '--format=value(serviceConfig.uri)',
    ],
    { allowFailure: true },
  );

  const baseUrl = described.output.trim().replace(/\/+$/, '');

  if (described.ok && baseUrl) return baseUrl;

  throw new Error(
    `Could not read the URL of ${functionName} from gcloud. Check that gcloud is authenticated against ${project}, or run npm run e2e:down -- --cloud firebase.`,
  );
}

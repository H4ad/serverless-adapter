import { copyFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRunId, expiry } from '../lib/run';
import { commandExists, requireCommand, run } from '../lib/shell';
import { saveState } from '../lib/state';
import type { RunState } from '../lib/types';
import {
  functionAppFor,
  locationFromEnv,
  resourceGroupFor,
  storageAccountFor,
} from './names';

const DIRECTORY = 'e2e/azure';
const DIST = `${DIRECTORY}/dist`;

export async function up(): Promise<RunState> {
  requireCommand('az', 'Install the Azure CLI and run az login first.');
  requireCommand('zip', 'Install zip, for example apt install zip.');
  requireCommand('npx', 'Install Node.js and npm.');
  const terraform = pickTerraform();

  const runId = createRunId();
  const expireAt = expiry();
  const location = locationFromEnv();
  const subscriptionId = subscriptionFromEnv();
  const resourceGroup = resourceGroupFor(runId);
  const functionApp = functionAppFor(runId);
  const storageAccount = storageAccountFor(runId);

  const state: RunState = {
    cloud: 'azure',
    runId,
    createdAt: new Date().toISOString(),
    expireAt,
    region: location,
    endpoints: {},
    resources: { resourceGroup, functionApp },
  };

  saveState(state);

  run(terraform, ['init', '-input=false'], {
    cwd: DIRECTORY,
    inherit: true,
  });

  run(
    terraform,
    [
      'apply',
      '-auto-approve',
      '-input=false',
      `-var=run_id=${runId}`,
      `-var=expire_at=${expireAt}`,
      `-var=location=${location}`,
      `-var=resource_group=${resourceGroup}`,
      `-var=function_app=${functionApp}`,
      `-var=storage_account=${storageAccount}`,
      `-var=subscription_id=${subscriptionId}`,
    ],
    { cwd: DIRECTORY, inherit: true },
  );

  const outputs = JSON.parse(
    run(terraform, ['output', '-json'], { cwd: DIRECTORY }),
  ) as Record<string, { value: string }>;
  const baseUrl = outputs.base_url.value.replace(/\/+$/, '');

  buildPackage();

  run(
    'az',
    [
      'functionapp',
      'deployment',
      'source',
      'config-zip',
      '--resource-group',
      resourceGroup,
      '--name',
      functionApp,
      '--src',
      `${DIST}/function.zip`,
      '--timeout',
      '600',
    ],
    { inherit: true },
  );

  state.endpoints = { baseUrl };
  saveState(state);

  console.log(`\n[azure] ${functionApp} is up at ${baseUrl}`);

  return state;
}

function pickTerraform(): string {
  if (commandExists('tofu')) return 'tofu';
  if (commandExists('terraform')) return 'terraform';

  throw new Error(
    'Install OpenTofu (https://opentofu.org) or Terraform to run the Azure e2e.',
  );
}

function subscriptionFromEnv(): string {
  const fromEnv = process.env.AZURE_SUBSCRIPTION_ID;
  if (fromEnv) return fromEnv;

  return run('az', [
    'account',
    'show',
    '--query',
    'id',
    '--output',
    'tsv',
  ]).trim();
}

function buildPackage(): void {
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  run(
    'npx',
    [
      'esbuild',
      'e2e/azure/function.ts',
      '--bundle',
      '--platform=node',
      '--target=node22',
      '--format=cjs',
      '--outfile',
      `${DIST}/index.js`,
      // Provided by the Functions host at runtime.
      '--external:@azure/functions-core',
    ],
    { inherit: true },
  );

  copyFileSync(`${DIRECTORY}/host.json`, `${DIST}/host.json`);
  writeFileSync(
    `${DIST}/package.json`,
    JSON.stringify(
      { name: 'sae2e', version: '1.0.0', main: 'index.js' },
      null,
      2,
    ),
  );

  run(
    'zip',
    [
      '-j',
      '-q',
      `${DIST}/function.zip`,
      `${DIST}/index.js`,
      `${DIST}/host.json`,
      `${DIST}/package.json`,
    ],
    { inherit: true },
  );
}

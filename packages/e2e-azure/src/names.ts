export const PROJECT_TAG = 'serverless-adapter-e2e';

export function resourceGroupFor(runId: string): string {
  return `sae2e-${runId.toLowerCase()}`;
}

export function functionAppFor(runId: string): string {
  return `sae2e-${runId.toLowerCase()}`;
}

export function storageAccountFor(runId: string): string {
  const compact = runId.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Storage account names are 3-24 characters, lowercase alphanumeric.
  return `sae2e${compact}`.slice(0, 24);
}

export function locationFromEnv(): string {
  return process.env.AZURE_LOCATION ?? 'brazilsouth';
}

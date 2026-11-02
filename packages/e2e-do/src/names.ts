import { join } from 'node:path';
import { moduleDir } from '@e2e/core/lib/paths';

export const PACKAGE = 'serverless-adapter-e2e';

export function functionNameFor(runId: string): string {
  return `sae2e-${runId.toLowerCase()}`;
}

export function projectDirectory(): string {
  return join(moduleDir(import.meta), '..', 'build');
}

export function regionFromEnv(): string {
  return process.env.DO_REGION ?? 'nyc1';
}

export function faasHostFromEnv(region: string): string {
  return process.env.DO_FAAS_HOST ?? `faas-${region}.doserverless.co`;
}

import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CloudName, RunState } from './types';

const STATE_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '.state');

function statePath(cloud: CloudName): string {
  return join(STATE_DIR, `${cloud}.json`);
}

export function saveState(state: RunState): void {
  mkdirSync(STATE_DIR, { recursive: true });
  writeFileSync(statePath(state.cloud), JSON.stringify(state, null, 2));
}

export function loadState(cloud: CloudName): RunState | undefined {
  const path = statePath(cloud);
  if (!existsSync(path)) return undefined;

  return JSON.parse(readFileSync(path, 'utf8')) as RunState;
}

export function clearState(cloud: CloudName): void {
  rmSync(statePath(cloud), { force: true });
}

export function stateDirectory(): string {
  return STATE_DIR;
}

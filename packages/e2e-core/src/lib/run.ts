import { randomBytes } from 'node:crypto';

const RUN_ID_PATTERN =
  /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z-[0-9a-f]{6}$/;

/**
 * Sortable, collision-resistant id used in every resource name. The timestamp
 * prefix is what the reaper reads to decide a run is old enough to delete.
 */
export function createRunId(now: Date = new Date()): string {
  const stamp = now
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
  const suffix = randomBytes(3).toString('hex');

  return `${stamp}-${suffix}`;
}

export function isRunId(value: string): boolean {
  return RUN_ID_PATTERN.test(value);
}

export function runIdTime(runId: string): Date | undefined {
  // Resource names are lowercased: sae2e-20261030t180000z-a1b2c3.
  const normalized = runId.replace(/(\d)t(\d{6})z/, '$1T$2Z');
  const match = RUN_ID_PATTERN.exec(normalized);
  if (!match) return undefined;

  const [, year, month, day, hour, minute, second] = match;

  return new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    ),
  );
}

/**
 * Every resource carries this timestamp. The reaper deletes anything whose
 * value is in the past, whatever the run that created it thinks happened.
 */
export function expiry(now: Date = new Date(), hours = 2): string {
  return new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();
}

export function isExpired(expireAt: string, now: Date = new Date()): boolean {
  const date = new Date(expireAt);
  if (Number.isNaN(date.getTime())) return false;

  return date.getTime() <= now.getTime();
}

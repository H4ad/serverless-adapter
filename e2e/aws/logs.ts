import { runResult } from '../lib/shell';

export function logGroupNames(prefix: string, region: string): string[] {
  const result = runResult(
    'aws',
    [
      'logs',
      'describe-log-groups',
      '--log-group-name-prefix',
      prefix,
      '--query',
      'logGroups[].logGroupName',
      '--output',
      'json',
      '--region',
      region,
    ],
    { allowFailure: true },
  );

  if (!result.ok) return [];

  try {
    return JSON.parse(result.output) as string[];
  } catch {
    return [];
  }
}

/**
 * The AWS event-source adapters have no response channel, so the fixture logs
 * the forwarded body and the smoke reads it back here.
 */
export async function readEventResult(
  logGroup: string,
  source: string,
  region: string,
  sinceMs: number,
): Promise<string | undefined> {
  const result = runResult(
    'aws',
    [
      'logs',
      'filter-log-events',
      '--log-group-name',
      logGroup,
      '--filter-pattern',
      `E2E_RESULT ${source}`,
      '--start-time',
      String(sinceMs),
      '--query',
      'events[].message',
      '--output',
      'json',
      '--region',
      region,
    ],
    { allowFailure: true },
  );

  if (!result.ok) return undefined;

  const messages = JSON.parse(result.output) as string[];

  for (const message of messages) {
    const tokens = message.trim().split(/\s+/);
    const index = tokens.indexOf('E2E_RESULT');

    if (index === -1) continue;
    if (tokens[index + 1] !== source) continue;

    const encoded = tokens[index + 2];
    if (!encoded) continue;

    return Buffer.from(encoded, 'base64').toString('utf8');
  }

  return undefined;
}

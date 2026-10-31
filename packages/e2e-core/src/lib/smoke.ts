import type { ParsedResponse } from './types';

export interface Check {
  name: string;
  run: () => Promise<void>;
}

export interface HeadersInitLike {
  [name: string]: string | string[];
}

export interface RequestOptions {
  method?: string;
  headers?: HeadersInitLike;
  body?: string | Buffer;
}

/**
 * Minimal fetch wrapper that keeps the body as a Buffer and the duplicate
 * response headers that `Headers` collapses. Cookies are read through
 * `getSetCookie` where the runtime has it.
 */
export async function request(
  url: string,
  options: RequestOptions = {},
): Promise<ParsedResponse> {
  const headers = new Headers();

  for (const [name, value] of Object.entries(options.headers ?? {})) {
    if (Array.isArray(value))
      for (const item of value) headers.append(name, item);
    else headers.set(name, value);
  }

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers,
    body:
      options.body === undefined
        ? undefined
        : typeof options.body === 'string'
          ? options.body
          : new Uint8Array(options.body),
  });

  const body = Buffer.from(await response.arrayBuffer());
  const flatHeaders: Record<string, string> = {};

  response.headers.forEach((value, key) => {
    flatHeaders[key] = value;
  });

  const withCookies = response.headers as Headers & {
    getSetCookie?: () => string[];
  };
  const setCookies =
    typeof withCookies.getSetCookie === 'function'
      ? withCookies.getSetCookie()
      : [];

  const text = body.toString('utf8');

  return {
    status: response.status,
    headers: flatHeaders,
    setCookies,
    body,
    text,
    json<T = unknown>(): T {
      return JSON.parse(text) as T;
    },
  };
}

/**
 * Runs the checks in order and prints one line each. Returns false instead of
 * throwing so the caller can still run `down` before exiting.
 */
export async function runChecks(
  title: string,
  checks: Check[],
): Promise<boolean> {
  console.log(`\n${title}`);

  const failures: string[] = [];

  for (const check of checks) {
    const startedAt = Date.now();

    try {
      await check.run();
      console.log(`  ok    ${check.name} (${Date.now() - startedAt}ms)`);
    } catch (error) {
      failures.push(check.name);
      console.log(`  FAIL  ${check.name}`);
      console.log(indent(errorMessage(error), '        '));
    }
  }

  const passed = checks.length - failures.length;

  console.log(`\n  ${passed}/${checks.length} passed`);

  if (failures.length > 0) console.log(`  failed: ${failures.join(', ')}`);

  return failures.length === 0;
}

/**
 * Waits for the deployed function to answer /health. A fresh API Gateway or
 * Function App can take a minute to route, and a failure here is clearer than
 * fifteen case failures.
 */
export async function waitForHealth(
  name: string,
  baseUrl: string,
  timeoutMs = 120_000,
): Promise<boolean> {
  try {
    await poll(
      `${name} /health`,
      async () => {
        const response = await request(`${baseUrl}/health`);

        return response.status === 200 ? true : undefined;
      },
      timeoutMs,
      3_000,
    );

    return true;
  } catch (error) {
    console.log(`\n  FAIL  ${name} never became ready`);
    console.log(`        ${errorMessage(error)}`);

    return false;
  }
}

/**
 * Polls until `fn` returns a value. Used for the event-source adapters, whose
 * result only exists after the trigger reaches the function and the log line
 * becomes readable.
 */
export async function poll<T>(
  label: string,
  fn: () => Promise<T | undefined>,
  timeoutMs = 90_000,
  intervalMs = 2_000,
): Promise<T> {
  const deadline = Date.now() + timeoutMs;
  let lastError: unknown;

  while (Date.now() < deadline) {
    try {
      const value = await fn();
      if (value !== undefined) return value;
    } catch (error) {
      lastError = error;
    }

    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }

  const suffix =
    lastError === undefined ? '' : ` Last error: ${errorMessage(lastError)}`;

  throw new Error(
    `Timed out after ${timeoutMs}ms waiting for ${label}.${suffix}`,
  );
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.stack ?? error.message;

  return String(error);
}

function indent(value: string, prefix: string): string {
  return value
    .split('\n')
    .map(line => `${prefix}${line}`)
    .join('\n');
}

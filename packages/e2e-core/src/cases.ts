import assert from 'node:assert/strict';
import {
  LARGE_SHA256,
  LARGE_SIZE,
  PNG_1X1,
  PNG_SHA256,
  sha256,
} from './fixture/payloads';
import { type Check, request, runChecks } from './lib/smoke';
import type { CloudName, ParsedResponse } from './lib/types';

export interface EchoResponse {
  method: string;
  path: string;
  query: Record<string, unknown>;
  bodyBase64: string;
  bodyLength: number;
  bodySha256: string;
  contentType: string | null;
  selectedHeaders: Record<string, unknown>;
}

export interface HttpCase {
  name: string;
  method: string;
  path: string;
  headers?: Record<string, string | string[]>;
  body?: string | Buffer;
  /** Clouds where the provider does not carry this part of the request. */
  skip?: CloudName[];
  check: (response: ParsedResponse) => void;
}

const jsonBody = JSON.stringify({ hello: 'world', nested: { answer: 42 } });
const multiValueHeaders = { 'x-multi': ['alpha', 'beta'] };

export const httpCases: HttpCase[] = [
  {
    name: 'health returns 200',
    method: 'GET',
    path: '/health',
    check(response) {
      assert.equal(response.status, 200);
      assert.deepEqual(response.json(), { ok: true });
    },
  },
  {
    name: 'echo carries method, path and query',
    method: 'GET',
    path: '/echo?page=2&tag=a&tag=b',
    check(response) {
      assert.equal(response.status, 200);

      const body = response.json<EchoResponse>();

      assert.equal(body.method, 'GET');
      assert.equal(body.path, '/echo');
      assert.equal(body.query.page, '2');
      assert.match(String(body.query.tag), /a/);
      assert.match(String(body.query.tag), /b/);
    },
  },
  {
    name: 'echo carries a json body',
    method: 'POST',
    path: '/echo',
    headers: { 'content-type': 'application/json' },
    body: jsonBody,
    check(response) {
      assert.equal(response.status, 200);

      const body = response.json<EchoResponse>();

      assert.equal(body.bodySha256, sha256(Buffer.from(jsonBody)));
      assert.equal(body.bodyLength, Buffer.byteLength(jsonBody));
      assert.equal(
        Buffer.from(body.bodyBase64, 'base64').toString('utf8'),
        jsonBody,
      );
      assert.match(String(body.contentType), /application\/json/);
    },
  },
  {
    name: 'echo carries a binary body',
    method: 'POST',
    path: '/echo',
    headers: { 'content-type': 'application/octet-stream' },
    body: PNG_1X1,
    check(response) {
      assert.equal(response.status, 200);

      const body = response.json<EchoResponse>();

      assert.equal(body.bodySha256, PNG_SHA256);
      assert.equal(body.bodyLength, PNG_1X1.length);
    },
  },
  {
    name: 'echo carries a custom header',
    method: 'GET',
    path: '/echo',
    headers: { 'x-test': 'e2e' },
    check(response) {
      assert.equal(response.status, 200);

      const body = response.json<EchoResponse>();

      assert.equal(body.selectedHeaders['x-test'], 'e2e');
    },
  },
  {
    name: 'binary response round trips',
    method: 'GET',
    path: '/binary',
    check(response) {
      assert.equal(response.status, 200);
      assert.match(String(response.headers['content-type']), /image\/png/);
      assert.equal(sha256(response.body), PNG_SHA256);
    },
  },
  {
    name: 'large response round trips',
    method: 'GET',
    path: '/large',
    check(response) {
      assert.equal(response.status, 200);
      assert.equal(response.body.length, LARGE_SIZE);
      assert.equal(sha256(response.body), LARGE_SHA256);
    },
  },
  {
    name: 'status 204 has no body',
    method: 'GET',
    path: '/status/204',
    check(response) {
      assert.equal(response.status, 204);
      assert.equal(response.body.length, 0);
    },
  },
  {
    name: 'status 418 is preserved',
    method: 'GET',
    path: '/status/418',
    check(response) {
      assert.equal(response.status, 418);
    },
  },
  {
    name: 'status 500 is preserved',
    method: 'GET',
    path: '/status/500',
    check(response) {
      assert.equal(response.status, 500);
    },
  },
  {
    name: 'multiple cookies are preserved',
    method: 'GET',
    path: '/cookies',
    check(response) {
      assert.equal(response.status, 200);

      const cookies = response.setCookies.join('; ');

      assert.match(cookies, /e2e_a=1/);
      assert.match(cookies, /e2e_b=2/);
    },
  },
  {
    name: 'multi-value headers are preserved',
    method: 'GET',
    path: '/headers',
    headers: multiValueHeaders,
    check(response) {
      assert.equal(response.status, 200);

      const serialized = JSON.stringify(response.json());

      assert.match(serialized, /alpha/);
      assert.match(serialized, /beta/);
    },
  },
  {
    name: 'remote address reaches the app',
    method: 'GET',
    path: '/ip',
    check(response) {
      assert.equal(response.status, 200);
      assert.equal(Object.hasOwn(response.json(), 'ip'), true);
    },
  },
  {
    name: 'chunked stream is concatenated',
    method: 'GET',
    path: '/stream',
    check(response) {
      assert.equal(response.status, 200);
      assert.equal(response.text, 'chunk-1chunk-2chunk-3');
    },
  },
  {
    name: 'unknown route returns 404',
    method: 'GET',
    path: '/does-not-exist',
    check(response) {
      assert.equal(response.status, 404);
      assert.equal(response.json<{ error: string }>().error, 'not found');
    },
  },
];

export function httpCasesFor(cloud: CloudName): HttpCase[] {
  return httpCases.filter(testCase => !testCase.skip?.includes(cloud));
}

export async function checkHttpCases(
  title: string,
  baseUrl: string,
  cloud: CloudName,
): Promise<boolean> {
  const checks: Check[] = httpCasesFor(cloud).map(testCase => ({
    name: testCase.name,
    async run() {
      const response = await request(`${baseUrl}${testCase.path}`, {
        method: testCase.method,
        headers: testCase.headers,
        body: testCase.body,
      });

      testCase.check(response);
    },
  }));

  return runChecks(title, checks);
}

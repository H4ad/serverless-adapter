import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { setTimeout } from 'timers/promises';
import express from 'express';
import { WritableMock } from 'stream-mock/lib/writable';
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest';
import type { ILogger } from '../../../src';
import { ApiGatewayV2Adapter } from '../../../src/adapters/aws';
import { ExpressFramework } from '../../../src/frameworks/express';
import { AwsStreamHandler } from '../../../src/handlers/aws';
import { DummyResolver } from '../../../src/resolvers/dummy';
import { createApiGatewayV2 } from '../../adapters/aws/utils/api-gateway-v2';

describe('Issue 262: response with trailing headers never finishes', () => {
  const awsStreamHandler = new AwsStreamHandler();

  const adapters = [new ApiGatewayV2Adapter()];
  const resolver = new DummyResolver();
  const binarySettings = { contentEncodings: [], contentTypes: [] };
  const respondWithErrors = true;
  const logger: ILogger = {
    debug: vitest.fn(),
    error: vitest.fn(),
    verbose: vitest.fn(),
    info: vitest.fn(),
    warn: vitest.fn(),
  };

  beforeEach(() => {
    (global as any).awslambda = {
      streamifyResponse: vitest.fn(fn => fn),
      HttpResponseStream: { from: vitest.fn(r => r) },
    };
  });

  afterEach(() => {
    (global as any).awslambda = undefined;
  });

  it('should finish the response and keep the trailers out of the body', async () => {
    const app = express();
    const file = readFileSync(join(__dirname, '../../handlers/bitcoin.pdf'));

    app.get('/', (_, res) => {
      const readable = createReadStream(
        join(__dirname, '../../handlers/bitcoin.pdf'),
      );

      res.statusCode = 200;
      res.setHeader('content-type', 'application/pdf');
      res.setHeader('Trailer', 'Content-MD5');
      res.flushHeaders();

      readable.pipe(res);

      res.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
    });

    const handler = awsStreamHandler.getHandler(
      app,
      new ExpressFramework(),
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('GET', '/', {}, { test: 'true' });
    const context = { test: Symbol('unique') };

    const writable = new WritableMock();

    // The old shim only ended the response on a write equal to `0\r\n\r\n`.
    // With trailers, that write carries the trailer block, so the handler never
    // finished and the runtime timed out the invocation.
    const result = await Promise.race([
      handler(event, writable, context).then(() => 'handled'),
      setTimeout(2000, 'timeout'),
    ]);

    expect(result).toBe('handled');

    const finalBuffer = Buffer.concat(writable.data);

    expect(finalBuffer.equals(file)).toBe(true);
  });
});

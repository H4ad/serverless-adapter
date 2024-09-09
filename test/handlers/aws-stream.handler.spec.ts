import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import { WritableMock } from 'stream-mock/lib/writable';
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest';
import { type ILogger, getCurrentInvoke } from '../../src';
import { ApiGatewayV2Adapter } from '../../src/adapters/aws';
import { ExpressFramework } from '../../src/frameworks/express';
import { AwsStreamHandler } from '../../src/handlers/aws';
import { DummyResolver } from '../../src/resolvers/dummy';
import { createApiGatewayV2 } from '../adapters/aws/utils/api-gateway-v2';

describe('AwsStreamHandler', () => {
  const awsStreamHandler = new AwsStreamHandler();

  const apiGatewayAdapter = new ApiGatewayV2Adapter();
  const adapters = [apiGatewayAdapter];
  const resolver = new DummyResolver();
  const binarySettings = { contentEncodings: [], contentTypes: [] };
  const respondWithErrors = true;
  const logger: ILogger = {
    debug: vitest.fn((m, callbackOrString) => {
      expect(typeof m === 'string').toBeTruthy();
      const content =
        typeof callbackOrString === 'function'
          ? callbackOrString()
          : callbackOrString || 'no-second-arg';
      expect(content).toBeTruthy();
    }),
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

  it('should return the correct bytes of chunked stream', async () => {
    const app = express();
    const file = readFileSync(join(__dirname, 'bitcoin.pdf'));

    app.get('/', (_, res) => {
      const readable = createReadStream(join(__dirname, 'bitcoin.pdf'));

      res.statusCode = 200;
      res.setHeader('content-type', 'application/pdf');
      readable.pipe(res);
    });

    const expressFramework = new ExpressFramework();

    const handler = awsStreamHandler.getHandler(
      app,
      expressFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('GET', '/', {}, { test: 'true' });
    const context = { test: Symbol('unique') };

    const writable = new WritableMock();

    await handler(event, writable, context);

    expect(getCurrentInvoke()).toHaveProperty('event', event);
    expect(getCurrentInvoke()).toHaveProperty('context', context);

    const finalBuffer = Buffer.concat(writable.data);

    expect(Buffer.byteLength(finalBuffer)).toBe(Buffer.byteLength(file));
  });

  it('should return the correct bytes of chunked stream with eagerly flushed headers', async () => {
    const app = express();
    const file = readFileSync(join(__dirname, 'bitcoin.pdf'));

    app.get('/', (_, res) => {
      const readable = createReadStream(join(__dirname, 'bitcoin.pdf'));

      res.statusCode = 200;
      res.setHeader('content-type', 'application/pdf');
      res.flushHeaders();
      readable.pipe(res);
    });

    const expressFramework = new ExpressFramework();

    const handler = awsStreamHandler.getHandler(
      app,
      expressFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('GET', '/', {}, { test: 'true' });
    const context = { test: Symbol('unique') };

    const writable = new WritableMock();

    await handler(event, writable, context);

    expect(getCurrentInvoke()).toHaveProperty('event', event);
    expect(getCurrentInvoke()).toHaveProperty('context', context);

    const finalBuffer = Buffer.concat(writable.data);

    expect(Buffer.byteLength(finalBuffer)).toBe(Buffer.byteLength(file));
  });

  it('should return the correct bytes of json', async () => {
    const app = express();

    app.get('/', (_, res) => {
      return res.json({ test: 'true' });
    });

    const expressFramework = new ExpressFramework();

    const handler = awsStreamHandler.getHandler(
      app,
      expressFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('GET', '/', {}, { test: 'true' });
    const context = { test: Symbol('unique') };

    const writable = new WritableMock();

    await handler(event, writable, context);

    expect(getCurrentInvoke()).toHaveProperty('event', event);
    expect(getCurrentInvoke()).toHaveProperty('context', context);

    const finalBuffer = Buffer.concat(writable.data);

    expect(finalBuffer.toString()).toBe(JSON.stringify({ test: 'true' }));
  });

  it('should handle redirect with status 304', async () => {
    const app = express();

    app.get('/', (_, res) => {
      return res.redirect(304, '/test');
    });

    const expressFramework = new ExpressFramework();

    const handler = awsStreamHandler.getHandler(
      app,
      expressFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('GET', '/', undefined);
    const context = { test: Symbol('unique') };

    const writable = new WritableMock();
    const write = vitest.spyOn(writable, 'write');

    await handler(event, writable, context);

    expect(getCurrentInvoke()).toHaveProperty('event', event);
    expect(getCurrentInvoke()).toHaveProperty('context', context);

    expect(write).toHaveBeenCalledWith('');

    const finalBuffer = Buffer.concat(writable.data);

    expect(finalBuffer.toString()).toBe('');
  });

  for (const statusCode of [300, 301, 302, 303, 305, 306, 307, 308]) {
    it(`should handle redirect with status ${statusCode}`, async () => {
      const app = express();

      app.get('/', (_, res) => {
        return res.redirect(statusCode, '/test');
      });

      const expressFramework = new ExpressFramework();

      const handler = awsStreamHandler.getHandler(
        app,
        expressFramework,
        adapters,
        resolver,
        binarySettings,
        respondWithErrors,
        logger,
      );

      const event = createApiGatewayV2('GET', '/', undefined);
      const context = { test: Symbol('unique') };

      const writable = new WritableMock();
      const write = vitest.spyOn(writable, 'write');

      await handler(event, writable, context);

      expect(getCurrentInvoke()).toHaveProperty('event', event);
      expect(getCurrentInvoke()).toHaveProperty('context', context);

      expect(write).toHaveBeenCalled();

      const finalBuffer = Buffer.concat(writable.data);

      expect(finalBuffer.toString()).toContain(
        'Redirecting to <a href="/test">/test</a>',
      );
    });
  }

  for (const statusCode of [200, 201, 202, 203, 204, 400, 401, 403, 404]) {
    it(`should handle no content with status ${statusCode}`, async () => {
      const app = express();

      app.get('/', (_, res) => {
        return res.status(statusCode).end();
      });

      const expressFramework = new ExpressFramework();

      const handler = awsStreamHandler.getHandler(
        app,
        expressFramework,
        adapters,
        resolver,
        binarySettings,
        respondWithErrors,
        logger,
      );

      const event = createApiGatewayV2('GET', '/', undefined);
      const context = { test: Symbol('unique') };

      const writable = new WritableMock();
      const write = vitest.spyOn(writable, 'write');

      await handler(event, writable, context);

      expect(getCurrentInvoke()).toHaveProperty('event', event);
      expect(getCurrentInvoke()).toHaveProperty('context', context);

      expect(write).toHaveBeenCalledWith('');

      const finalBuffer = Buffer.concat(writable.data);

      expect(finalBuffer.toString()).toBe('');
    });
  }

  for (const statusCode of [200, 201, 202, 203, 204, 400, 401, 403, 404]) {
    it(`should handle writeHead with no content and status ${statusCode}`, async () => {
      const app = express();

      app.get('/', (_, res) => {
        return res.writeHead(statusCode).end();
      });

      const expressFramework = new ExpressFramework();

      const handler = awsStreamHandler.getHandler(
        app,
        expressFramework,
        adapters,
        resolver,
        binarySettings,
        respondWithErrors,
        logger,
      );

      const event = createApiGatewayV2('GET', '/', undefined);
      const context = { test: Symbol('unique') };

      const writable = new WritableMock();
      const write = vitest.spyOn(writable, 'write');

      await handler(event, writable, context);

      expect(getCurrentInvoke()).toHaveProperty('event', event);
      expect(getCurrentInvoke()).toHaveProperty('context', context);

      expect(write).toHaveBeenCalledWith('');

      const finalBuffer = Buffer.concat(writable.data);

      expect(finalBuffer.toString()).toBe('');
    });
  }

  it('should handle HEAD requests', async () => {
    const app = express();

    app.head('/', (_, res) => {
      return res.set(200).end();
    });

    const expressFramework = new ExpressFramework();

    const handler = awsStreamHandler.getHandler(
      app,
      expressFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('HEAD', '/', undefined);
    const context = { test: Symbol('unique') };

    const writable = new WritableMock();
    const write = vitest.spyOn(writable, 'write');

    await handler(event, writable, context);

    expect(getCurrentInvoke()).toHaveProperty('event', event);
    expect(getCurrentInvoke()).toHaveProperty('context', context);

    expect(write).toHaveBeenCalledWith('');

    const finalBuffer = Buffer.concat(writable.data);

    expect(finalBuffer.toString()).toBe('');
  });

  it('should handle correctly the cookies', async () => {
    const app = express();

    app.get('/', (_, res) => {
      res.setHeader('set-cookie', 'test=1');
      res.json({ ok: true });
    });

    const expressFramework = new ExpressFramework();

    const handler = awsStreamHandler.getHandler(
      app,
      expressFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('GET', '/', {}, { test: 'true' });
    const context = { test: Symbol('unique') };

    const writable = new WritableMock();

    await handler(event, writable, context);

    expect(getCurrentInvoke()).toHaveProperty('event', event);
    expect(getCurrentInvoke()).toHaveProperty('context', context);

    expect(
      (global as any).awslambda.HttpResponseStream.from,
    ).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: expect.not.objectContaining({
          'set-cookie': 'test=1',
        }),
        cookies: ['test=1'],
      }),
    );
  });

  it('should handle correctly the cookies array', async () => {
    const app = express();

    app.get('/', (_, res) => {
      res.setHeader('set-cookie', ['test=1', 'test2=3']);
      res.json({ ok: true });
    });

    const expressFramework = new ExpressFramework();

    const handler = awsStreamHandler.getHandler(
      app,
      expressFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('GET', '/', {}, { test: 'true' });
    const context = { test: Symbol('unique') };

    const writable = new WritableMock();

    await handler(event, writable, context);

    expect(getCurrentInvoke()).toHaveProperty('event', event);
    expect(getCurrentInvoke()).toHaveProperty('context', context);

    expect(
      (global as any).awslambda.HttpResponseStream.from,
    ).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: expect.not.objectContaining({
          'set-cookie': 'test=1',
        }),
        cookies: ['test=1', 'test2=3'],
      }),
    );
  });
});

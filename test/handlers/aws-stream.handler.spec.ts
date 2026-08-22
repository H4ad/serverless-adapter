import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import { WritableMock } from 'stream-mock/lib/writable';
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest';
import {
  type AdapterContract,
  DEFAULT_NETWORK,
  type ILogger,
  type NetworkContract,
  getCurrentInvoke,
} from '../../src';
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

    expect(getCurrentInvoke()).toEqual({ context: null, event: null });

    const finalBuffer = Buffer.concat(writable.data);

    expect(Buffer.byteLength(finalBuffer)).toBe(Buffer.byteLength(file));
  });

  it('should return the correct bytes of json and expose the current invoke while handling the request', async () => {
    const app = express();
    const event = createApiGatewayV2('GET', '/', {}, { test: 'true' });
    const context = { test: Symbol('unique') };

    app.get('/', (_, res) => {
      expect(getCurrentInvoke()).toHaveProperty('event', event);
      expect(getCurrentInvoke()).toHaveProperty('context', context);

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

    const writable = new WritableMock();

    await handler(event, writable, context);

    const finalBuffer = Buffer.concat(writable.data);

    expect(finalBuffer.toString()).toBe(JSON.stringify({ test: 'true' }));
  });

  it('should use custom network to create the forwarded request', async () => {
    const app = express();
    const customNetwork: NetworkContract = {
      createRequest: vitest.fn(props => DEFAULT_NETWORK.createRequest(props)),
      createResponse: vitest.fn(props => DEFAULT_NETWORK.createResponse(props)),
      getResponseBody: vitest.fn(response =>
        DEFAULT_NETWORK.getResponseBody(response),
      ),
      getResponseHeaders: vitest.fn(response =>
        DEFAULT_NETWORK.getResponseHeaders(response),
      ),
    };

    app.post('/', (_, res) => {
      return res.json({ ok: true });
    });

    const expressFramework = new ExpressFramework();

    const handler = (awsStreamHandler.getHandler as any)(
      app,
      expressFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
      customNetwork,
    );

    const requestBody = { test: 'true' };
    const event = createApiGatewayV2('POST', '/', requestBody, {
      'content-length': Buffer.byteLength(
        JSON.stringify(requestBody),
      ).toString(),
      'content-type': 'application/json',
      test: 'true',
    });
    const context = { test: Symbol('unique') };
    const writable = new WritableMock();

    await handler(event, writable, context);

    expect(customNetwork.createRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        body: Buffer.from(JSON.stringify(requestBody)),
        headers: expect.objectContaining({
          'content-length': Buffer.byteLength(
            JSON.stringify(requestBody),
          ).toString(),
          'content-type': 'application/json',
        }),
        remoteAddress: '203.123.103.37',
        url: '/',
      }),
    );
    expect(customNetwork.createResponse).not.toHaveBeenCalled();
    expect(customNetwork.getResponseBody).not.toHaveBeenCalled();
    expect(customNetwork.getResponseHeaders).not.toHaveBeenCalled();
  });

  it('should propagate forwarding errors while preserving current invoke', async () => {
    const app = express();
    const event = createApiGatewayV2('GET', '/', {}, { test: 'true' });
    const context = { test: Symbol('unique') };
    const error = new Error('error on test');
    let currentInvokeDuringError: unknown;

    const failingAdapter: AdapterContract<any, any, any> = {
      getAdapterName: () => 'FailingAdapter',
      canHandle: () => true,
      getRequest: () => {
        currentInvokeDuringError = getCurrentInvoke();
        throw error;
      },
      getResponse: () => ({}),
      onErrorWhileForwarding: vitest.fn(),
    };

    const expressFramework = new ExpressFramework();

    const handler = awsStreamHandler.getHandler(
      app,
      expressFramework,
      [failingAdapter],
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const writable = new WritableMock();

    await expect(handler(event, writable, context)).rejects.toBe(error);

    expect(currentInvokeDuringError).toEqual({ event, context });
    expect(getCurrentInvoke()).toEqual({ context: null, event: null });
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

      expect(write).toHaveBeenCalled();

      const finalBuffer = Buffer.concat(writable.data);

      expect(finalBuffer.toString()).toContain('Redirecting to /test');
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

      expect(write).toHaveBeenCalledWith('');

      const finalBuffer = Buffer.concat(writable.data);

      expect(finalBuffer.toString()).toBe('');
    });
  }

  // when the response is sent after an await, the request is already being awaited by
  // `waitForStreamComplete`, so the response has to actually emit `finish` to complete
  for (const statusCode of [200, 204, 403, 500]) {
    it(`should handle no content sent asynchronously with status ${statusCode}`, async () => {
      const app = express();

      app.get('/', async (_, res) => {
        await new Promise(resolve => setImmediate(resolve));

        res.status(statusCode).end();
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

      expect(write).toHaveBeenCalledWith('');

      const finalBuffer = Buffer.concat(writable.data);

      expect(finalBuffer.toString()).toBe('');
    }, 2000);
  }

  for (const statusCode of [200, 204, 403, 500]) {
    it(`should handle an empty body sent asynchronously with status ${statusCode}`, async () => {
      const app = express();

      app.get('/', async (_, res) => {
        await new Promise(resolve => setImmediate(resolve));

        res.status(statusCode).send();
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

      expect(write).toHaveBeenCalledWith('');

      const finalBuffer = Buffer.concat(writable.data);

      expect(finalBuffer.toString()).toBe('');
    }, 2000);
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

  it('callbackWaitsForEmptyEventLoop should not be modified', async () => {
    const app = express();

    app.get('/', (_, res) => {
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
    const defaultValueForCallback = Symbol('1');
    const context = {
      test: Symbol('unique'),
      callbackWaitsForEmptyEventLoop: defaultValueForCallback,
    };

    const writable = new WritableMock();

    await handler(event, writable, context);

    expect(context).toHaveProperty(
      'callbackWaitsForEmptyEventLoop',
      defaultValueForCallback,
    );
  });

  describe('callbackWaitsForEmptyEventLoop should be changed', () => {
    for (const value of [true, false]) {
      it(`to ${value}`, async () => {
        const app = express();

        app.get('/', (_, res) => {
          res.json({ ok: true });
        });

        const expressFramework = new ExpressFramework();
        const customAwsHandler = new AwsStreamHandler({
          callbackWaitsForEmptyEventLoop: value,
        });

        const handler = customAwsHandler.getHandler(
          app,
          expressFramework,
          adapters,
          resolver,
          binarySettings,
          respondWithErrors,
          logger,
        );

        const event = createApiGatewayV2('GET', '/', {}, { test: 'true' });
        const defaultValueForCallback = Symbol('test');
        const context = {
          test: Symbol('unique'),
          callbackWaitsForEmptyEventLoop: defaultValueForCallback,
        };

        const writable = new WritableMock();

        await handler(event, writable, context);

        expect(context).toHaveProperty('callbackWaitsForEmptyEventLoop', value);
      });
    }
  });
});

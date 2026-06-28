import type { IncomingMessage, ServerResponse } from 'node:http';
import { describe, expect, it, vitest } from 'vitest';
import {
  type AdapterContract,
  type ILogger,
  NO_OP,
  type OnErrorProps,
  getCurrentInvoke,
} from '../../src';
import { ApiGatewayV2Adapter } from '../../src/adapters/aws';
import { DefaultHandler } from '../../src/handlers/default';
import { CallbackResolver } from '../../src/resolvers/callback';
import { PromiseResolver } from '../../src/resolvers/promise';
import { createApiGatewayV2 } from '../adapters/aws/utils/api-gateway-v2';
import { FrameworkMock } from '../mocks/framework.mock';

class CurrentInvokeFrameworkMock extends FrameworkMock {
  public constructor(
    statusCode: number,
    mockedResponseData: object,
    private readonly expectedEvent: object,
    private readonly expectedContext: object,
  ) {
    super(statusCode, mockedResponseData);
  }

  public override sendRequest(
    app: null,
    request: IncomingMessage,
    response: ServerResponse,
  ): void {
    expect(getCurrentInvoke()).toHaveProperty('event', this.expectedEvent);
    expect(getCurrentInvoke()).toHaveProperty('context', this.expectedContext);

    super.sendRequest(app, request, response);
  }
}

describe('DefaultHandler', () => {
  const defaultHandler = new DefaultHandler();

  const app = null;
  const response = { batata: true };
  const apiGatewayAdapter = new ApiGatewayV2Adapter();
  const adapters = [apiGatewayAdapter] as AdapterContract<any, any, any>[];
  const resolver = new PromiseResolver();
  const binarySettings = { contentEncodings: [], contentTypes: [] };
  const respondWithErrors = true;
  const executeLog = (_, fn) => typeof fn === 'function' && fn();
  const logger: ILogger = {
    debug: vitest.fn(executeLog),
    error: vitest.fn(executeLog),
    verbose: vitest.fn(executeLog),
    info: vitest.fn(executeLog),
    warn: vitest.fn(executeLog),
  };

  it('should forward and return the response from a request with different status', async () => {
    const options: [statusCode: number][] = [[200], [400]];

    for (const [statusCode] of options) {
      const event = createApiGatewayV2('GET', '/users', {}, { test: 'true' });
      const context = { test: Symbol('unique') };
      const framework = new CurrentInvokeFrameworkMock(
        statusCode,
        response,
        event,
        context,
      );

      const handler = defaultHandler.getHandler(
        app,
        framework,
        adapters,
        resolver,
        binarySettings,
        respondWithErrors,
        logger,
      );

      const result = await handler(event, context, NO_OP);

      expect(getCurrentInvoke()).toEqual({ context: null, event: null });

      expect(logger.debug).toHaveBeenNthCalledWith(
        1,
        'SERVERLESS_ADAPTER:PROXY',
        expect.any(Function),
      );

      expect(logger.debug).toHaveBeenNthCalledWith(
        2,
        'SERVERLESS_ADAPTER:RESOLVED_ADAPTER_NAME: ',
        apiGatewayAdapter.getAdapterName(),
      );

      expect(logger.debug).toHaveBeenNthCalledWith(
        3,
        'SERVERLESS_ADAPTER:FORWARD_REQUEST_TO_FRAMEWORK:REQUEST_VALUES',
        expect.any(Function),
      );

      expect(logger.debug).toHaveBeenNthCalledWith(
        4,
        'SERVERLESS_ADAPTER:FORWARD_REQUEST_TO_FRAMEWORK:RESPONSE',
        expect.any(Function),
      );

      expect(logger.debug).toHaveBeenNthCalledWith(
        5,
        'SERVERLESS_ADAPTER:FORWARD_RESPONSE:EVENT_SOURCE_RESPONSE_PARAMS',
        expect.any(Function),
      );

      expect(logger.debug).toHaveBeenNthCalledWith(
        6,
        'SERVERLESS_ADAPTER:FORWARD_RESPONSE:EVENT_SOURCE_RESPONSE',
        expect.any(Function),
      );

      expect(result).toHaveProperty('headers', {
        'content-type': 'application/json',
      });
      expect(result).toHaveProperty('isBase64Encoded', false);
      expect(result).toHaveProperty('statusCode', statusCode);
      expect(result).toHaveProperty('body', JSON.stringify(response));
    }
  });

  it('should forward and return the response from a request with base64 encoding', async () => {
    const framework = new FrameworkMock(200, response);

    const handler = defaultHandler.getHandler(
      app,
      framework,
      adapters,
      resolver,
      { isBinary: () => true },
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('GET', '/users', {}, { test: 'true' });
    const context = { test: Symbol('unique') };

    const result = await handler(event, context, NO_OP);

    expect(result).toHaveProperty('headers', {
      'content-type': 'application/json',
    });
    expect(result).toHaveProperty('isBase64Encoded', true);
    expect(result).toHaveProperty('statusCode', 200);
    expect(result).toHaveProperty(
      'body',
      Buffer.from(JSON.stringify(response)).toString('base64'),
    );
  });

  it('should forward and return the response from a request with empty body', async () => {
    const framework = new FrameworkMock(200, response);

    const handler = defaultHandler.getHandler(
      app,
      framework,
      adapters,
      resolver,
      { isBinary: () => true },
      respondWithErrors,
      logger,
    );

    const event = createApiGatewayV2('GET', '/users', undefined, {
      test: 'true',
    });
    const context = { test: Symbol('unique') };

    const result = await handler(event, context, NO_OP);

    expect(result).toHaveProperty('headers', {
      'content-type': 'application/json',
    });
    expect(result).toHaveProperty('isBase64Encoded', true);
    expect(result).toHaveProperty('statusCode', 200);
    expect(result).toHaveProperty(
      'body',
      Buffer.from(JSON.stringify(response)).toString('base64'),
    );
  });

  it('should forward errors through the resolver while preserving current invoke', async () => {
    const error = new Error('error on test');
    const event = createApiGatewayV2('GET', '/users', {}, { test: 'true' });
    const context = { test: Symbol('unique') };
    let currentInvokeDuringError: unknown;

    const failingAdapter: AdapterContract<any, any, any> = {
      getAdapterName: () => 'FailingAdapter',
      canHandle: () => true,
      getRequest: () => {
        throw error;
      },
      getResponse: () => ({}),
      onErrorWhileForwarding: vitest.fn(
        ({ delegatedResolver, error }: OnErrorProps<any, any>) => {
          currentInvokeDuringError = getCurrentInvoke();
          delegatedResolver.fail(error);
        },
      ),
    };

    const localLogger: ILogger = {
      debug: vitest.fn(executeLog),
      error: vitest.fn(executeLog),
      verbose: vitest.fn(executeLog),
      info: vitest.fn(executeLog),
      warn: vitest.fn(executeLog),
    };

    const handler = defaultHandler.getHandler(
      app,
      new FrameworkMock(200, response),
      [failingAdapter],
      resolver,
      binarySettings,
      respondWithErrors,
      localLogger,
    );

    await expect(handler(event, context, NO_OP)).rejects.toBe(error);

    expect(failingAdapter.onErrorWhileForwarding).toHaveBeenCalledTimes(1);
    expect(localLogger.error).toHaveBeenCalledWith(
      'SERVERLESS_ADAPTER:RESPOND_TO_EVENT_SOURCE_WITH_ERROR',
      error,
    );
    expect(currentInvokeDuringError).toEqual({ event, context });
    expect(getCurrentInvoke()).toEqual({ context: null, event: null });
  });

  describe('Node.js 24 handler arity', () => {
    it('should expose handler arity compatible with NODEJS_24_X', () => {
      const handler = defaultHandler.getHandler(
        app,
        new FrameworkMock(200, response),
        adapters,
        resolver,
        binarySettings,
        respondWithErrors,
        logger,
      );

      expect(handler.length).toBeLessThanOrEqual(2);
    });

    it('should resolve promise when called with two arguments only', async () => {
      const framework = new FrameworkMock(200, response);

      const handler = defaultHandler.getHandler(
        app,
        framework,
        adapters,
        resolver,
        binarySettings,
        respondWithErrors,
        logger,
      );

      const event = createApiGatewayV2('GET', '/users', {}, { test: 'true' });
      const context = { test: Symbol('unique') };

      const result = await handler(event, context);

      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body', JSON.stringify(response));
    });
  });

  describe('CallbackResolver positional callback', () => {
    it('should forward callback from third positional argument', async () => {
      const callbackResolver = new CallbackResolver();
      const framework = new FrameworkMock(200, response);
      const mockCallback = vitest.fn();

      const handler = defaultHandler.getHandler(
        app,
        framework,
        adapters,
        callbackResolver,
        binarySettings,
        respondWithErrors,
        logger,
      );

      const event = createApiGatewayV2('GET', '/users', {}, { test: 'true' });
      const context = { test: Symbol('unique') };

      handler(event, context, mockCallback);

      await new Promise<void>(resolve => {
        setTimeout(() => {
          expect(mockCallback).toHaveBeenCalledWith(
            null,
            expect.objectContaining({
              statusCode: 200,
              body: JSON.stringify(response),
            }),
          );

          resolve();
        }, 200);
      });
    });
  });
});

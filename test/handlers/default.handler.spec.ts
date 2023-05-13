import { describe, expect, it, vitest } from 'vitest';
import { ILogger, NO_OP, getCurrentInvoke } from '../../src';
import { ApiGatewayV2Adapter } from '../../src/adapters/aws';
import { DefaultHandler } from '../../src/handlers/default';
import { PromiseResolver } from '../../src/resolvers/promise';
import { createApiGatewayV2 } from '../adapters/aws/utils/api-gateway-v2';
import { FrameworkMock } from '../mocks/framework.mock';

describe('DefaultHandler', () => {
  const defaultHandler = new DefaultHandler();

  const app = null;
  const response = { batata: true };
  const apiGatewayAdapter = new ApiGatewayV2Adapter();
  const adapters = [apiGatewayAdapter];
  const resolver = new PromiseResolver();
  const binarySettings = { contentEncodings: [], contentTypes: [] };
  const respondWithErrors = true;
  const executeLog = (m, fn) => typeof fn === 'function' && fn();
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
      const framework = new FrameworkMock(statusCode, response);

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

      const result = await handler(event, context, NO_OP);

      expect(getCurrentInvoke()).toHaveProperty('event', event);
      expect(getCurrentInvoke()).toHaveProperty('context', context);

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
});

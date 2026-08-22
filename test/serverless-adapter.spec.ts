import { describe, expect, it, vitest } from 'vitest';
import {
  type BinarySettings,
  DEFAULT_BINARY_CONTENT_TYPES,
  DEFAULT_BINARY_ENCODINGS,
  DEFAULT_NETWORK,
  type HandlerContract,
  type ILogger,
  NO_OP,
  type NetworkContract,
  ServerlessAdapter,
  createDefaultLogger,
} from '../src';
import { ApiGatewayV2Adapter } from '../src/adapters/aws';
import * as logger from '../src/core/logger';
import { DefaultHandler } from '../src/handlers/default';
import { PromiseResolver } from '../src/resolvers/promise';
import { createApiGatewayV2 } from './adapters/aws/utils/api-gateway-v2';
import { FrameworkMock } from './mocks/framework.mock';

describe('ServerlessAdapter', () => {
  it('should have correct default values', () => {
    const defaultLoggerSymbol = Symbol('createDefaultLogger');

    vitest
      .spyOn(logger, 'createDefaultLogger')
      .mockReturnValue(defaultLoggerSymbol as any);
    const oldEnv = process.env;
    vitest.resetModules();
    process.env = { ...oldEnv, NODE_ENV: 'test' };

    const adapter = ServerlessAdapter.new(null);

    expect(adapter['binarySettings']).toHaveProperty(
      'contentEncodings',
      DEFAULT_BINARY_ENCODINGS,
    );
    expect(adapter['binarySettings']).toHaveProperty(
      'contentTypes',
      DEFAULT_BINARY_CONTENT_TYPES,
    );
    expect(adapter['respondWithErrors']).toEqual(false);
    expect(adapter['log']).toEqual(defaultLoggerSymbol);
    expect(adapter['network']).toEqual(DEFAULT_NETWORK);
    expect(adapter['adapters']).toHaveLength(0);
    expect(adapter['framework']).toBeUndefined();
    expect(adapter['resolver']).toBeUndefined();
    expect(adapter['handler']).toBeUndefined();
    expect(adapter['app']).toEqual(null);

    vitest.resetModules();
    process.env = { ...oldEnv, NODE_ENV: 'development' };
    const developmentAdapter = ServerlessAdapter.new(null);

    expect(developmentAdapter['respondWithErrors']).toEqual(true);
  });

  it('should can create a pipeline of handlers', () => {
    const statusCode = 200;
    const response = { body: true };
    const app = null;

    const mockedHandler: HandlerContract<any, any, any, any, any, any> = {
      getHandler: vitest.fn(() => NO_OP),
    };

    const adapter = new ApiGatewayV2Adapter();
    const logger = createDefaultLogger();
    const respondWithErrors = false;
    const resolver = new PromiseResolver();
    const framework = new FrameworkMock(statusCode, response);
    const binarySettings: BinarySettings = { isBinary: () => true };

    const handler = ServerlessAdapter.new(app)
      .setHandler(mockedHandler)
      .setLogger(logger)
      .setRespondWithErrors(respondWithErrors)
      .setResolver(resolver)
      .setFramework(framework)
      .setBinarySettings(binarySettings)
      .addAdapter(adapter)
      .build();

    expect(handler).toBe(NO_OP);
    expect(mockedHandler.getHandler).toHaveBeenCalledWith(
      app,
      framework,
      [adapter],
      resolver,
      expect.objectContaining(binarySettings),
      respondWithErrors,
      logger,
      DEFAULT_NETWORK,
    );
  });

  it('should use custom network implementation while building a handler', async () => {
    const response = { body: true };
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
    const executeLog = (_: unknown, fn?: () => unknown) =>
      typeof fn === 'function' ? fn() : undefined;
    const testLogger: ILogger = {
      debug: vitest.fn(executeLog),
      error: vitest.fn(executeLog),
      verbose: vitest.fn(executeLog),
      info: vitest.fn(executeLog),
      warn: vitest.fn(executeLog),
    };

    const handler = ServerlessAdapter.new(null)
      .setHandler(new DefaultHandler())
      .setNetwork(customNetwork)
      .setLogger(testLogger)
      .setResolver(new PromiseResolver())
      .setFramework(new FrameworkMock(200, response))
      .addAdapter(new ApiGatewayV2Adapter())
      .build();

    const result = await handler(
      createApiGatewayV2('GET', '/users', undefined, { test: 'true' }),
      {},
    );

    expect(result).toHaveProperty('statusCode', 200);
    expect(result).toHaveProperty('body', JSON.stringify(response));
    expect(customNetwork.createRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: '/users',
        remoteAddress: '203.123.103.37',
      }),
    );
    expect(customNetwork.createResponse).toHaveBeenCalledWith({
      method: 'GET',
    });
    expect(customNetwork.getResponseHeaders).toHaveBeenCalledTimes(1);
    expect(customNetwork.getResponseBody).toHaveBeenCalledTimes(1);
  });

  it('should CANNOT set handler twice', () => {
    const handler = new DefaultHandler();

    expect(() =>
      ServerlessAdapter.new(null)
        .setHandler(handler)
        .setRespondWithErrors(true)
        .setHandler(handler),
    ).toThrow('twice');
  });

  it('should CANNOT set framework twice', () => {
    const framework = new FrameworkMock(200, {});

    expect(() =>
      ServerlessAdapter.new(null)
        .setFramework(framework)
        .setRespondWithErrors(true)
        .setFramework(framework),
    ).toThrow('twice');
  });

  it('should CANNOT set resolver twice', () => {
    const resolver = new PromiseResolver();

    expect(() =>
      ServerlessAdapter.new(null)
        .setResolver(resolver)
        .setRespondWithErrors(true)
        .setResolver(resolver),
    ).toThrow('twice');
  });

  it('should CANNOT build without set resolver', () => {
    expect(() => ServerlessAdapter.new(null).build()).toThrow('set a resolver');
  });

  it('should CANNOT build without set framework', () => {
    expect(() =>
      ServerlessAdapter.new(null).setResolver(new PromiseResolver()).build(),
    ).toThrow('set a framework');
  });

  it('should CANNOT build without set handler', () => {
    expect(() =>
      ServerlessAdapter.new(null)
        .setResolver(new PromiseResolver())
        .setFramework(new FrameworkMock(200, {}))
        .build(),
    ).toThrow('set a handler');
  });

  it('should CANNOT build without set at least one adapter', () => {
    expect(() =>
      ServerlessAdapter.new(null)
        .setResolver(new PromiseResolver())
        .setFramework(new FrameworkMock(200, {}))
        .setHandler(new DefaultHandler())
        .build(),
    ).toThrow('one adapter');
  });

  it('should build handler with arity compatible with NODEJS_24_X', () => {
    const handler = ServerlessAdapter.new(null)
      .setHandler(new DefaultHandler())
      .setResolver(new PromiseResolver())
      .setFramework(new FrameworkMock(200, {}))
      .addAdapter(new ApiGatewayV2Adapter())
      .build();

    expect(handler.length).toBeLessThanOrEqual(2);
  });
});

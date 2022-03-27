import { ServerlessBuilder } from '../src';
import { BinarySettings } from '../src/@types';
import { ApiGatewayV2Adapter } from '../src/adapters/aws';
import { HandlerContract } from '../src/contracts';
import { NO_OP, createDefaultLogger } from '../src/core';
import { DefaultHandler } from '../src/handlers';
import { PromiseResolver } from '../src/resolvers';
import { FrameworkMock } from './mocks/framework.mock';

describe('ServerlessBuilder', () => {
  it('should can create a pipeline of handlers', () => {
    const statusCode = 200;
    const response = { body: true };
    const app = null;

    const mockedHandler: HandlerContract<any, any, any, any, any, any> = {
      getHandler: jest.fn(() => NO_OP),
    };

    const adapter = new ApiGatewayV2Adapter();
    const logger = createDefaultLogger();
    const respondWithErrors = false;
    const resolver = new PromiseResolver();
    const framework = new FrameworkMock(statusCode, response);
    const binarySettings: BinarySettings = { isBinary: () => true };

    const handler = ServerlessBuilder.new(app)
      .setHandler(mockedHandler)
      .setLogger(logger)
      .setRespondWithErrors(respondWithErrors)
      .setResolver(resolver)
      .setFramework(framework)
      .setBinarySettings(binarySettings)
      .addAdapter(adapter)
      .build();

    expect(handler).toBe(NO_OP);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedHandler.getHandler).toHaveBeenCalledWith(
      app,
      framework,
      [adapter],
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );
  });

  it('should CANNOT set handler twice', () => {
    const handler = new DefaultHandler();

    expect(() =>
      ServerlessBuilder.new(null)
        .setHandler(handler)
        .setRespondWithErrors(true)
        .setHandler(handler),
    ).toThrow('twice');
  });

  it('should CANNOT set framework twice', () => {
    const framework = new FrameworkMock(200, {});

    expect(() =>
      ServerlessBuilder.new(null)
        .setFramework(framework)
        .setRespondWithErrors(true)
        .setFramework(framework),
    ).toThrow('twice');
  });

  it('should CANNOT set resolver twice', () => {
    const resolver = new PromiseResolver();

    expect(() =>
      ServerlessBuilder.new(null)
        .setResolver(resolver)
        .setRespondWithErrors(true)
        .setResolver(resolver),
    ).toThrow('twice');
  });

  it('should CANNOT build without set resolver', () => {
    expect(() => ServerlessBuilder.new(null).build()).toThrow('set a resolver');
  });

  it('should CANNOT build without set framework', () => {
    expect(() =>
      ServerlessBuilder.new(null).setResolver(new PromiseResolver()).build(),
    ).toThrow('set a framework');
  });

  it('should CANNOT build without set handler', () => {
    expect(() =>
      ServerlessBuilder.new(null)
        .setResolver(new PromiseResolver())
        .setFramework(new FrameworkMock(200, {}))
        .build(),
    ).toThrow('set a handler');
  });

  it('should CANNOT build without set at least one adapter', () => {
    expect(() =>
      ServerlessBuilder.new(null)
        .setResolver(new PromiseResolver())
        .setFramework(new FrameworkMock(200, {}))
        .setHandler(new DefaultHandler())
        .build(),
    ).toThrow('one adapter');
  });
});

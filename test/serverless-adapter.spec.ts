import {
  BinarySettings,
  HandlerContract,
  NO_OP,
  ServerlessAdapter,
  createDefaultLogger,
} from '../src';
import { ApiGatewayV2Adapter } from '../src/adapters/aws';
import { DefaultHandler } from '../src/handlers/default';
import { PromiseResolver } from '../src/resolvers/promise';
import { FrameworkMock } from './mocks/framework.mock';

describe('ServerlessAdapter', () => {
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
});

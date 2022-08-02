import { ILogger, createDefaultLogger } from '../../src';
import { HttpTriggerV4Adapter } from '../../src/adapters/azure';
import { AzureHandler } from '../../src/handlers/azure';
import { DefaultHandler } from '../../src/handlers/default';
import { PromiseResolver } from '../../src/resolvers/promise';
import {
  createHttpTriggerContext,
  createHttpTriggerEvent,
} from '../adapters/azure/utils/http-trigger';
import { FrameworkMock } from '../mocks/framework.mock';

describe(AzureHandler.name, () => {
  const azureHandlerFactory = new AzureHandler();

  const app = null;
  const response = { batata: true };
  const mockFramework = new FrameworkMock(200, response);
  const httpTriggerAdapter = new HttpTriggerV4Adapter();
  const adapters = [httpTriggerAdapter];
  const resolver = new PromiseResolver();
  const binarySettings = { contentEncodings: [], contentTypes: [] };
  const respondWithErrors = true;
  const logger: ILogger = {
    debug: jest.fn(),
    error: jest.fn(),
    verbose: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  };

  it('should call default handler with correct params', () => {
    const defaultServerlessHandler = jest.fn(() => Promise.resolve(response));
    const defaultGetHandler = jest
      .spyOn(DefaultHandler.prototype, 'getHandler')
      .mockImplementation(() => defaultServerlessHandler);

    const getHandlerArguments = [
      app,
      mockFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    ] as const;

    const azureHandler = azureHandlerFactory.getHandler(...getHandlerArguments);

    const event = createHttpTriggerEvent('GET', '/');
    const context = createHttpTriggerContext('GET', '/');

    expect(azureHandler(context, event)).resolves.toBe(response);

    expect(defaultGetHandler).toHaveBeenCalledWith(...getHandlerArguments);
    expect(defaultServerlessHandler).toHaveBeenCalledWith(
      event,
      context,
      undefined,
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(context.done).toBeUndefined();
    expect(context.res).toBeUndefined();
  });

  it('should prefer context log method when send default logger', () => {
    const event = createHttpTriggerEvent('GET', '/');
    const context = createHttpTriggerContext('GET', '/');

    const defaultServerlessHandler = jest.fn(() => Promise.resolve(response));
    const defaultGetHandler = jest
      .spyOn(DefaultHandler.prototype, 'getHandler')
      .mockImplementation(() => defaultServerlessHandler);

    const getHandlerArguments = [
      app,
      mockFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
    ] as const;

    const azureHandler = azureHandlerFactory.getHandler(
      ...getHandlerArguments,
      createDefaultLogger(),
    );

    expect(azureHandler(context, event)).resolves.toBe(response);

    expect(defaultGetHandler).toHaveBeenCalledWith(
      ...getHandlerArguments,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect.objectContaining({ error: context.log.error }),
    );
    expect(defaultServerlessHandler).toHaveBeenCalledWith(
      event,
      context,
      undefined,
    );
  });

  it('should prefer default log method when send false to useContextLogWhenInternalLogger option', () => {
    const event = createHttpTriggerEvent('GET', '/');
    const context = createHttpTriggerContext('GET', '/');

    const defaultServerlessHandler = jest.fn(() => Promise.resolve(response));
    const defaultGetHandler = jest
      .spyOn(DefaultHandler.prototype, 'getHandler')
      .mockImplementation(() => defaultServerlessHandler);

    const log = createDefaultLogger();

    const getHandlerArguments = [
      app,
      mockFramework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      log,
    ] as const;

    const azureHandler = new AzureHandler({
      useContextLogWhenInternalLogger: false,
    }).getHandler(...getHandlerArguments);

    expect(azureHandler(context, event)).resolves.toBe(response);

    expect(defaultGetHandler).toHaveBeenCalledWith(...getHandlerArguments);
    expect(defaultServerlessHandler).toHaveBeenCalledWith(
      event,
      context,
      undefined,
    );
  });
});

import { ILogger } from '../../src';
import { HttpFunctionAdapter } from '../../src/adapters/digital-ocean';
import { DefaultHandler } from '../../src/handlers/default';
import { DigitalOceanHandler } from '../../src/handlers/digital-ocean/digital-ocean.handler';
import { PromiseResolver } from '../../src/resolvers/promise';
import { createHttpTriggerEvent } from '../adapters/azure/utils/http-trigger';
import { FrameworkMock } from '../mocks/framework.mock';

describe(DigitalOceanHandler.name, () => {
  const azureHandlerFactory = new DigitalOceanHandler();

  const app = null;
  const response = { batata: true };
  const mockFramework = new FrameworkMock(200, response);
  const adapter = new HttpFunctionAdapter();
  const adapters = [adapter];
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

    expect(azureHandler(event)).resolves.toBe(response);

    expect(defaultGetHandler).toHaveBeenCalledWith(...getHandlerArguments);
    expect(defaultServerlessHandler).toHaveBeenCalledWith(
      event,
      undefined,
      undefined,
    );
  });
});

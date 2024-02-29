import { describe, expect, it, vitest } from 'vitest';
import { type ILogger } from '../../src';
import { HttpFunctionAdapter } from '../../src/adapters/digital-ocean';
import { DefaultHandler } from '../../src/handlers/default';
import { DigitalOceanHandler } from '../../src/handlers/digital-ocean';
import { PromiseResolver } from '../../src/resolvers/promise';
import { FrameworkMock } from '../mocks/framework.mock';
import { createHttpFunctionEvent } from '../adapters/digital-ocean/utils/http-function';
import type { DigitalOceanHttpEvent } from '../../src/@types/digital-ocean';

describe(DigitalOceanHandler.name, () => {
  const azureHandlerFactory = new DigitalOceanHandler<
    null,
    DigitalOceanHttpEvent,
    any,
    any
  >();

  const app = null;
  const response = { batata: true };
  const mockFramework = new FrameworkMock(200, response);
  const adapter = new HttpFunctionAdapter();
  const adapters = [adapter];
  const resolver = new PromiseResolver();
  const binarySettings = { contentEncodings: [], contentTypes: [] };
  const respondWithErrors = true;
  const logger: ILogger = {
    debug: vitest.fn(),
    error: vitest.fn(),
    verbose: vitest.fn(),
    info: vitest.fn(),
    warn: vitest.fn(),
  };

  it('should call default handler with correct params', () => {
    const defaultServerlessHandler = vitest.fn(() => Promise.resolve(response));
    const defaultGetHandler = vitest
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

    const event = createHttpFunctionEvent('GET', '/');

    expect(azureHandler(event)).resolves.toBe(response);

    expect(defaultGetHandler).toHaveBeenCalledWith(...getHandlerArguments);
    expect(defaultServerlessHandler).toHaveBeenCalledWith(
      event,
      undefined,
      undefined,
    );
  });
});

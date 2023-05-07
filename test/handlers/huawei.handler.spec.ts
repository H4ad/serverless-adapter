import * as http from 'http';
import { describe, expect, it, vitest } from 'vitest';
import supertest from 'supertest';
import { ILogger } from '../../src';
import { DummyAdapter } from '../../src/adapters/dummy';
import {
  DEFAULT_HUAWEI_LISTEN_PORT,
  HttpHuaweiHandler,
} from '../../src/handlers/huawei';
import { DummyResolver } from '../../src/resolvers/dummy';
import { FrameworkMock } from '../mocks/framework.mock';

describe(HttpHuaweiHandler.name, () => {
  const app = null;

  const response = { batata: true };
  const adapters = [new DummyAdapter()];
  const resolver = new DummyResolver();
  const binarySettings = { contentEncodings: [], contentTypes: [] };
  const respondWithErrors = true;
  const logger: ILogger = {
    debug: vitest.fn(),
    error: vitest.fn(),
    verbose: vitest.fn(),
    info: vitest.fn(),
    warn: vitest.fn(),
  };

  it('should create correctly mocked server and test default constants', async () => {
    const listenMock = vitest.fn();
    const closeMock = vitest.fn();
    const addEventListenerMock = vitest.fn();
    const createServerMock = vitest.fn(
      () =>
        ({
          listen: listenMock,
          close: closeMock,
          addEventListener: addEventListenerMock,
        } as unknown as http.Server),
    );

    const handlerFactory = new HttpHuaweiHandler({
      httpServerFactory: createServerMock,
    });

    const framework = new FrameworkMock(200, response);

    const dispose = handlerFactory.getHandler(
      app,
      framework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    expect(addEventListenerMock).toHaveBeenCalledWith(
      'request',
      expect.any(Function),
    );

    expect(createServerMock).toHaveBeenCalledWith(app, framework);
    expect(listenMock).toHaveBeenCalledWith(
      DEFAULT_HUAWEI_LISTEN_PORT,
      expect.any(Function),
    );

    await expect(dispose()).resolves.toBeUndefined();

    expect(closeMock).toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalled();
  });

  async function waitUntilServerStarted(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  it.only('should create correctly http server', async () => {
    const handlerFactory = new HttpHuaweiHandler();
    const framework = new FrameworkMock(200, response);

    const dispose = handlerFactory.getHandler(
      app,
      framework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    await waitUntilServerStarted();

    expect(logger.debug).toHaveBeenCalledWith(
      expect.stringContaining('Server started'),
    );

    await expect(dispose()).resolves.toBeUndefined();

    expect(logger.debug).toHaveBeenCalledWith(
      expect.stringContaining('Disposing'),
    );
  });

  it.only('should forward correctly the request to framework', async () => {
    let httpServer!: http.Server;

    const handlerFactory = new HttpHuaweiHandler({
      httpServerFactory: requestListener => {
        const server = http.createServer(requestListener);

        httpServer = server;

        return server;
      },
    });

    const responseStatus = 200;
    const framework = new FrameworkMock(responseStatus, response);

    const dispose = handlerFactory.getHandler(
      app,
      framework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    const httpResponse = await supertest(httpServer).get('/').send();

    expect(httpResponse.status).toBe(responseStatus);
    expect(httpResponse.body).toStrictEqual(response);

    await expect(dispose()).resolves.toBeUndefined();
  });

  it.only('should throw error if something wrong occours on dispose', async () => {
    const error = new Error('something wrong occours');

    const mockServer = {
      listen: vitest.fn(),
      close: vitest.fn(cb => cb(error)),
    } as unknown as http.Server;

    const handlerFactory = new HttpHuaweiHandler({
      httpServerFactory: () => {
        return mockServer;
      },
    });

    const framework = new FrameworkMock(200, response);

    const dispose = handlerFactory.getHandler(
      app,
      framework,
      adapters,
      resolver,
      binarySettings,
      respondWithErrors,
      logger,
    );

    await waitUntilServerStarted();

    await expect(async () => await dispose()).rejects.toThrow(error);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockServer.close).toHaveBeenCalledWith(expect.any(Function));
  });
});

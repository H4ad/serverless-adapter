import { describe, expect, it, vitest } from 'vitest';
import {
  type ILogger,
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import { LazyFramework } from '../../src/frameworks/lazy';
import { FrameworkMock } from '../mocks/framework.mock';

describe(LazyFramework.name, () => {
  it('should can lazy create an instance of any app and return the cached version', async () => {
    const appInstance = Symbol('Your app');

    const mockFramework = new FrameworkMock(200, {
      data: true,
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    mockFramework.sendRequest = vitest.fn(mockFramework.sendRequest);

    const factory = vitest.fn(
      () => new Promise(resolve => setTimeout(() => resolve(appInstance), 100)),
    );

    const framework = new LazyFramework(mockFramework, factory);

    const firstRequest = new ServerlessRequest({
      method: 'POST',
      headers: {},
      url: '/users',
    });
    const firstResponse = new ServerlessResponse({
      method: 'POST',
    });

    framework.sendRequest(null, firstRequest, firstResponse);

    await waitForStreamComplete(firstResponse);

    expect(framework['factory']).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockFramework.sendRequest).toHaveBeenLastCalledWith(
      appInstance,
      firstRequest,
      firstResponse,
    );

    const secondRequest = new ServerlessRequest({
      method: 'GET',
      headers: {},
      url: '/users',
    });
    const secondResponse = new ServerlessResponse({
      method: 'GET',
    });

    framework.sendRequest(null, secondRequest, secondResponse);

    await waitForStreamComplete(secondResponse);

    expect(factory).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockFramework.sendRequest).toHaveBeenCalledTimes(2);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockFramework.sendRequest).toHaveBeenLastCalledWith(
      appInstance,
      secondRequest,
      secondResponse,
    );
  });

  it('should throw error if error occours in factory function', async () => {
    const mockFramework = new FrameworkMock(200, {
      data: true,
    });

    const mockLogger = { error: vitest.fn() } as unknown as ILogger;
    const error = new Error('Something Wrong Occours');

    const framework = new LazyFramework(
      mockFramework,
      () => Promise.reject(error),
      mockLogger,
    );

    const request = new ServerlessRequest({
      method: 'GET',
      headers: {},
      url: '/users',
    });
    const response = new ServerlessResponse({
      method: 'GET',
    });

    framework.sendRequest(null, request, response);

    await expect(
      async () => await waitForStreamComplete(response),
    ).rejects.toThrowError('factory is not valid,');
  });
});

import type { HttpsOptions } from 'firebase-functions/v2/https';
import { describe, expect, it, vitest } from 'vitest';
import {
  DEFAULT_NETWORK,
  type FrameworkContract,
  type NetworkContract,
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import { FrameworkMock } from '../mocks/framework.mock';

describe('HttpFirebaseV2Handler', () => {
  it('should forward correctly the request to framework', async () => {
    const { HttpFirebaseV2Handler } =
      await import('../../src/handlers/firebase');
    const handlerFactory = new HttpFirebaseV2Handler();

    const method = 'POST';
    const url = '/users/batata';
    const headers = { 'Content-Type': 'application/json' };
    const remoteAddress = '168.16.0.1';
    const body = Buffer.from('{"test": true}', 'utf-8');

    const request = new ServerlessRequest({
      method,
      url,
      headers,
      remoteAddress,
      body,
    });

    const response = new ServerlessResponse({
      method,
    });

    const responseBody = { batata: true };
    const responseStatus = 200;
    const framework = new FrameworkMock(responseStatus, responseBody);

    const handler = handlerFactory.getHandler(null, framework);

    handler(request, response);

    await waitForStreamComplete(response);

    expect(response.statusCode).toBe(responseStatus);
    expect(ServerlessResponse.body(response).toString()).toStrictEqual(
      JSON.stringify(responseBody),
    );
  });

  it('should handle weird body types', async () => {
    const { HttpFirebaseV2Handler } =
      await import('../../src/handlers/firebase');
    const handlerFactory = new HttpFirebaseV2Handler();

    const method = 'POST';
    const url = '/users/batata';
    const headers = { 'Content-Type': 'application/json' };
    const remoteAddress = '168.16.0.1';
    const options = [{ potato: true }, [{ test: true }]];

    for (const option of options) {
      const request = new ServerlessRequest({
        method,
        url,
        headers,
        remoteAddress,
        body: option as any,
      });

      const response = new ServerlessResponse({
        method,
      });

      const framework: FrameworkContract<unknown> = {
        sendRequest: vitest.fn(
          async (
            _app: null,
            req: ServerlessRequest,
            res: ServerlessResponse,
          ) => {
            expect(req.body?.toString()).toEqual(JSON.stringify(option));
            expect(req.headers['content-length']).toEqual(
              Buffer.byteLength(JSON.stringify(option)).toString(),
            );

            req.pipe(res);

            await waitForStreamComplete(res);

            expect(ServerlessResponse.body(res).toString()).toEqual(
              JSON.stringify(option),
            );
          },
        ),
      };

      const handler = handlerFactory.getHandler(null, framework);

      handler(request, response);
    }
  });

  it('should forward the properties to https.onRequest', async () => {
    const { HttpFirebaseV2Handler } =
      await import('../../src/handlers/firebase');
    const options: HttpsOptions = {
      concurrency: 400,
    };
    const factory = new HttpFirebaseV2Handler(options);

    const spyMethod = vitest.spyOn(factory, 'onRequestWithOptions' as any);

    factory.getHandler(null, new FrameworkMock(200, {}));

    expect(spyMethod).toHaveBeenCalledWith(options, expect.any(Function));
  });

  it('should use custom network with https options to create the forwarded request', async () => {
    const { HttpFirebaseV2Handler } =
      await import('../../src/handlers/firebase');
    const method = 'POST';
    const url = '/users/batata';
    const remoteAddress = '168.16.0.1';
    const body = { test: true };
    const request = new ServerlessRequest({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': remoteAddress,
      },
      remoteAddress,
      body: body as any,
    });
    const response = new ServerlessResponse({ method });
    const customNetwork: NetworkContract = {
      createRequest: vitest.fn(props => DEFAULT_NETWORK.createRequest(props)),
      createResponse: vitest.fn(props => DEFAULT_NETWORK.createResponse(props)),
      getResponseBody: vitest.fn(result =>
        DEFAULT_NETWORK.getResponseBody(result),
      ),
      getResponseHeaders: vitest.fn(result =>
        DEFAULT_NETWORK.getResponseHeaders(result),
      ),
    };
    const options: HttpsOptions = { concurrency: 400 };
    const factory = new HttpFirebaseV2Handler(options);
    const spyMethod = vitest
      .spyOn(factory, 'onRequestWithOptions' as any)
      .mockImplementation((_options, callback) => callback);
    const handler = (factory.getHandler as any)(
      null,
      new FrameworkMock(200, { ok: true }),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      customNetwork,
    );

    handler(request, response);

    await waitForStreamComplete(response);

    expect(spyMethod).toHaveBeenCalledWith(options, expect.any(Function));
    expect(customNetwork.createRequest).toHaveBeenCalledWith({
      method,
      url,
      body: Buffer.from(JSON.stringify(body)),
      headers: {
        'content-length': Buffer.byteLength(JSON.stringify(body)).toString(),
        'content-type': 'application/json',
        'x-forwarded-for': remoteAddress,
      },
      remoteAddress,
    });
    expect(customNetwork.createResponse).not.toHaveBeenCalled();
    expect(customNetwork.getResponseBody).not.toHaveBeenCalled();
    expect(customNetwork.getResponseHeaders).not.toHaveBeenCalled();
  });
});

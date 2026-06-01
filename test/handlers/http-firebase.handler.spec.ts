import { describe, expect, it, vitest } from 'vitest';
import type { Request, Response } from 'express';
import {
  type FrameworkContract,
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import { FrameworkMock } from '../mocks/framework.mock';

describe('HttpFirebaseHandler', () => {
  it('should forward correctly the request to framework', async () => {
    const { HttpFirebaseHandler } = await import('../../src/handlers/firebase');
    const handlerFactory = new HttpFirebaseHandler<null>();

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

    handler(request as Request, response as unknown as Response);

    await waitForStreamComplete(response);

    expect(response.statusCode).toBe(responseStatus);
    expect(ServerlessResponse.body(response).toString()).toStrictEqual(
      JSON.stringify(responseBody),
    );
  });

  it('should handle weird body types', async () => {
    const { HttpFirebaseHandler } = await import('../../src/handlers/firebase');
    const handlerFactory = new HttpFirebaseHandler();

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

      handler(request as Request, response as unknown as Response);
    }
  });
});

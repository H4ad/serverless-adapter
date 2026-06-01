import type { HttpsOptions } from 'firebase-functions/v2/https';
import semver from 'semver';
import { describe, expect, it, vitest } from 'vitest';
import {
  type FrameworkContract,
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import { FrameworkMock } from '../mocks/framework.mock';

describe.skipIf(semver.gte(process.versions.node, '25.0.0'))(
  'HttpFirebaseV2Handler (SDK v5)',
  () => {
    it('should forward correctly the request to framework', async () => {
      vitest.doMock('firebase-functions/v2', async () => {
        return await import('firebase-functions-v5/v2');
      });
      vitest.resetModules();
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
      vitest.doMock('firebase-functions/v2', async () => {
        return await import('firebase-functions-v5/v2');
      });
      vitest.resetModules();
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
      vitest.doMock('firebase-functions/v2', async () => {
        return await import('firebase-functions-v5/v2');
      });
      vitest.resetModules();
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
  },
);

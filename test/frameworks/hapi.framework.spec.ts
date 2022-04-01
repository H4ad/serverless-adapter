import { Server } from '@hapi/hapi';
import type { Server as HapiServer } from 'hapi';
import { HapiFramework } from '../../src/frameworks';
import { TestRouteBuilderHandler, createTestSuiteFor } from './utils';

function createHandler(
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
): TestRouteBuilderHandler<HapiServer> {
  return (app, path, handler) => {
    app.route({
      method,
      path,
      handler: (request, h) => {
        const [statusCode, resultBody, headers] = handler(
          request.headers,
          request.payload,
        );

        const response = h.response(resultBody);

        for (const header of Object.keys(headers))
          response?.header(header, headers[header]);

        response.code(statusCode);

        return response;
      },
    });
  };
}

describe(HapiFramework.name, () => {
  createTestSuiteFor(
    () => new HapiFramework(),
    () => new Server(),
    {
      get: createHandler('GET'),
      delete: createHandler('DELETE'),
      post: createHandler('POST'),
      put: createHandler('PUT'),
    },
  );
});

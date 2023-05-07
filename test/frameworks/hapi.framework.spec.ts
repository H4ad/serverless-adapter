import { Server } from '@hapi/hapi';
import { describe } from 'vitest';
import { HapiFramework } from '../../src/frameworks/hapi';
import { TestRouteBuilderHandler, createTestSuiteFor } from './utils';

function createHandler(
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
): TestRouteBuilderHandler<Server> {
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

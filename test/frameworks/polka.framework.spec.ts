import { describe } from 'vitest';
import polka, { type Polka } from 'polka';
import { PolkaFramework } from '../../src/frameworks/polka';
import { type TestRouteBuilderHandler, createTestSuiteFor } from './utils';

function createHandler(
  method: 'get' | 'post' | 'delete' | 'put',
): TestRouteBuilderHandler<Polka> {
  return (app, path, handler) => {
    app[method](path, (request, response) => {
      const [statusCode, resultBody, headers] = handler(
        request.headers,
        request.body,
      );

      for (const header of Object.keys(headers))
        response.setHeader(header, headers[header]);

      response.statusCode = statusCode;
      response.end(JSON.stringify(resultBody));
    });
  };
}

describe(PolkaFramework.name, () => {
  createTestSuiteFor(
    () => new PolkaFramework(),
    () => polka(),
    {
      get: createHandler('get'),
      delete: createHandler('delete'),
      post: createHandler('post'),
      put: createHandler('put'),
    },
  );
});

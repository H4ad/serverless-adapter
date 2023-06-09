import fastify, { FastifyInstance } from 'fastify';
import { describe } from 'vitest';
import { FastifyFramework } from '../../src/frameworks/fastify';
import { TestRouteBuilderHandler, createTestSuiteFor } from './utils';

function createHandler(
  method: 'get' | 'post' | 'delete' | 'put',
): TestRouteBuilderHandler<FastifyInstance> {
  return (app, path, handler) => {
    app[method](path, {}, (request, response) => {
      const [statusCode, resultBody, headers] = handler(
        request.headers,
        request.body,
      );

      response.headers(headers).code(statusCode).send(resultBody);
    });
  };
}

describe(FastifyFramework.name, () => {
  createTestSuiteFor(
    () => new FastifyFramework(),
    () => fastify(),
    {
      get: createHandler('get'),
      delete: createHandler('delete'),
      post: createHandler('post'),
      put: createHandler('put'),
    },
  );
});

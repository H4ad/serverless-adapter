import express, { Express } from 'express';
import { describe } from 'vitest';
import { ExpressFramework } from '../../src/frameworks/express';
import { TestRouteBuilderHandler, createTestSuiteFor } from './utils';

function createHandler(
  method: 'get' | 'post' | 'delete' | 'put',
): TestRouteBuilderHandler<Express> {
  return (app, path, handler) => {
    app[method](path, (request, response) => {
      const [statusCode, resultBody, headers] = handler(
        request.headers,
        request.body,
      );

      for (const header of Object.keys(headers))
        response.header(header, headers[header]);

      response.status(statusCode).json(resultBody);
    });
  };
}

describe(ExpressFramework.name, () => {
  createTestSuiteFor(
    () => new ExpressFramework(),
    () => express(),
    {
      get: createHandler('get'),
      delete: createHandler('delete'),
      post: createHandler('post'),
      put: createHandler('put'),
    },
  );
});

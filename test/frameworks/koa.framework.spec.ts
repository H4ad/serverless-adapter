import Application, { Context } from 'koa';
import { describe } from 'vitest';
import { NO_OP } from '../../src';
import { KoaFramework } from '../../src/frameworks/koa';
import { TestRouteBuilderHandler, createTestSuiteFor } from './utils';

function createHandler(): TestRouteBuilderHandler<Application> {
  return (app, path, handler) => {
    app.use((ctx: Context) => {
      const [statusCode, resultBody, headers] = handler(ctx.headers, NO_OP);

      for (const header of Object.keys(headers))
        ctx.set(header, headers[header]);

      ctx.status = statusCode;
      ctx.body = resultBody;
    });
  };
}

describe(KoaFramework.name, () => {
  createTestSuiteFor(
    () => new KoaFramework(),
    () => new Application(),
    {
      get: createHandler(),
      delete: createHandler(),
      post: createHandler(),
      put: createHandler(),
    },
  );
});

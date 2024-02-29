import Application, { type Context } from 'koa';
import { describe } from 'vitest';
import { NO_OP } from '../../src';
import { KoaFramework } from '../../src/frameworks/koa';
import { type TestRouteBuilderHandler, createTestSuiteFor } from './utils';

function createHandler(): TestRouteBuilderHandler<Application> {
  return (app, _, handler) => {
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

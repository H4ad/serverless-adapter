import { App } from '@deepkit/app';
import {
  FrameworkModule,
  TestingFacade,
  createTestingApp,
} from '@deepkit/framework';
import {
  HttpBody,
  HttpKernel,
  HttpModule,
  HttpRequest,
  HttpRouterRegistry,
  JSONResponse,
} from '@deepkit/http';
import { HttpDeepkitFramework } from '../../src/frameworks/deepkit';
import { TestRouteBuilderHandler, createTestSuiteFor } from './utils';

function createHandler(
  method: 'get' | 'post' | 'delete' | 'put',
): TestRouteBuilderHandler<TestingFacade<App<any>>> {
  return (app, path, handler) => {
    const router = app.app.get(HttpRouterRegistry);

    router[method](path, (request: HttpRequest, body: HttpBody<any>) => {
      const [statusCode, resultBody, headers] = handler(request.headers, body);

      const response = new JSONResponse(resultBody, statusCode);

      for (const header of Object.keys(headers))
        response.header(header, headers[header]);

      return response;
    });
  };
}

describe(HttpDeepkitFramework.name, () => {
  createTestSuiteFor(
    () => {
      return new HttpDeepkitFramework();
    },
    async () => {
      const testingApp = createTestingApp({
        imports: [
          new HttpModule({ debug: true }),
          new FrameworkModule({ debug: true, httpLog: true }),
        ],
      });

      await testingApp.startServer();

      return testingApp;
    },
    {
      get: createHandler('get'),
      delete: createHandler('delete'),
      post: createHandler('post'),
      put: createHandler('put'),
    },
    app => app.app.get(HttpKernel),
    async app => await app.stopServer(),
    process.env.SKIP_DEEPKIT === 'true',
  );
});

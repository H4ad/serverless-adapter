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
import { HttpDeepkitFramework } from '../../lib/frameworks/deepkit';
import { TestRouteBuilderHandler, createTestSuiteFor } from './utils';

export function createDeepkitHandler(
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

export const runDeepkitTest = () => {
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
        get: createDeepkitHandler('get'),
        delete: createDeepkitHandler('delete'),
        post: createDeepkitHandler('post'),
        put: createDeepkitHandler('put'),
      },
      app => app.app.get(HttpKernel),
      async app => await app.stopServer(),
      process.env.SKIP_DEEPKIT === 'true',
    );
  });
};

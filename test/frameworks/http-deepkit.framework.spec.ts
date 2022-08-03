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

      // testingApp.app
      //   .get(HttpRouterRegistry)
      //   .any('/users', (request: HttpRequest, response: HttpResponse) => {
      //     console.log(request, response);
      //   });

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
  );
});

//
// describe(HttpDeepkitFramework.name, () => {
//   createTestSuiteFor(
//     () => new HttpDeepkitFramework(),
//     () => {
//       const testingApp = createTestingApp({
//         controllers: [TestController],
//         imports: [new HttpModule()],
//       });
//
//       return testingApp.app.get(HttpKernel);
//     },
//     {
//       get: NO_OP,
//       delete: NO_OP,
//       post: NO_OP,
//       put: NO_OP,
//     },
//   );
// });

// Could not resolve request Error: No method getUsers200 found in TestController
// at ReflectionClass.getMethod (/home/h4ad/Projects/h4ad/opensource/serverless-adapter/node_modules/@deepkit/type/src/reflection/reflection.ts:1291:28)
// at parseRoutePathToRegex (/home/h4ad/Projects/h4ad/opensource/serverless-adapter/node_modules/@deepkit/http/src/router.ts:234:72)
// at parseRouteControllerAction (/home/h4ad/Projects/h4ad/opensource/serverless-adapter/node_modules/@deepkit/http/src/router.ts:256:24)
// at Router.getRouteCode (/home/h4ad/Projects/h4ad/opensource/serverless-adapter/node_modules/@deepkit/http/src/router.ts:424:29)
// at Router.build (/home/h4ad/Projects/h4ad/opensource/serverless-adapter/node_modules/@deepkit/http/src/router.ts:697:28)
// at Router.resolveRequest (/home/h4ad/Projects/h4ad/opensource/serverless-adapter/node_modules/@deepkit/http/src/router.ts:738:28)
// at HttpListener.onRoute (/home/h4ad/Projects/h4ad/opensource/serverless-adapter/node_modules/@deepkit/http/src/http.ts:473:42)
// at self (eval at buildAsync (/home/h4ad/Projects/h4ad/opensource/serverless-adapter/node_modules/@deepkit/core/src/compiler.ts:111:62), <anonymous>:60:51)
// at HttpKernel.handleRequest (/home/h4ad/Projects/h4ad/opensource/serverless-adapter/node_modules/@deepkit/http/src/kernel.ts:42:17)

import { createTestingApp } from '@deepkit/framework';
import { HttpRequest, JSONResponse, http } from '@deepkit/http';

// [
//   // ['get', '/users', 200, [{ name: 'Joga10' }]],
//   // ['get', '/users/list', 200, []],
//   // ['get', '/users/1', 404, { didntFind: 'entity' }],
//   ['get', '/users/2', 404, { notFound: true }],
//   ['post', '/empty/route', 204, undefined, ''],
//   ['post', '/users/error', 401, { unathorized: true }],
//   ['post', '/users', 201, { success: true }],
//   ['put', '/users/1', 201, { updated: true }],
//   ['put', '/users/2', 404, { notFound: true }],
//   ['put', '/users/3', 404, { didntFind: 'entity' }],
//   ['delete', '/users/1', 200, { deleted: true }],
//   ['delete', '/users/noreturn', 204, undefined, ''],
//   ['delete', '/users/2', 401, { unathorized: true }],
//   ['get', '/bad-gateway', 503, { error: true }],
// ];

test('http controller', async () => {
  class TestController {
    @http.GET('/users')
    getUsers200() {
      return { name: 'Joga10' };
    }

    @http.GET('/users/list')
    getUsersList200() {
      return [];
    }

    @http.GET('/users/1')
    getUser1() {
      return new JSONResponse({ didntFind: 'entity' }, 404);
    }
  }

  const testing = createTestingApp({ controllers: [TestController] });
  await testing.startServer();

  const response = await testing.request(
    HttpRequest.GET('/users')
      .header('accept', 'application/json')
      .query({ text: 'world' }),
  );

  expect(response.body.toString()).toBe('hello world');
  expect(response.getHeader('content-type')).toBe('text/plain; charset=utf-8');
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

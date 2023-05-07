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
import {
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import { HttpDeepkitFramework } from '../../src/frameworks/deepkit';
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

it('should convert correctly when the value is not an buffer', async () => {
  const framework = new HttpDeepkitFramework();
  const kernel: Partial<HttpKernel> = {
    handleRequest: jest.fn((request, response) => {
      request.pipe(response);

      return void 0 as any;
    }),
  };
  const textCodes = 'test'.split('').map(c => c.charCodeAt(0));

  const request = new ServerlessRequest({
    body: Uint8Array.of(...textCodes),
    url: '/test',
    method: 'POST',
    headers: {},
  });
  const response = new ServerlessResponse({
    method: 'POST',
  });

  framework.sendRequest(kernel as HttpKernel, request, response);

  await waitForStreamComplete(response);

  const resultBody = ServerlessResponse.body(response);

  expect(resultBody).toBeInstanceOf(Buffer);
  expect(resultBody.toString()).toEqual('test');
});

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

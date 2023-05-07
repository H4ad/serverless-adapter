import { App } from '@deepkit/app';
import {
  HttpBody,
  HttpKernel,
  HttpModule,
  HttpRequest,
  HttpRouterRegistry,
  JSONResponse,
} from '@deepkit/http';
import { describe, expect, it, vitest } from 'vitest';
import {
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import { HttpDeepkitFramework } from '../../src/frameworks/deepkit';
import { TestRouteBuilderHandler } from './utils';

export function createDeepkitHandler(
  method: 'get' | 'post' | 'delete' | 'put',
): TestRouteBuilderHandler<App<any>> {
  return (app, path, handler) => {
    const router = app.get(HttpRouterRegistry);

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
    handleRequest: vitest.fn((request, response) => {
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

describe('deepkit', () => {
  it('should return valid json on get request', async () => {
    const app = new App({
      imports: [new HttpModule()],
    });

    const body = { test: 'ok' };

    app.get(HttpRouterRegistry).get('/', () => {
      return new JSONResponse(body, 200).header('response-header', 'true');
    });

    const request = new ServerlessRequest({
      method: 'GET',
      url: '/',
      headers: {},
    });

    const response = new ServerlessResponse({
      method: 'GET',
    });
    const framework = new HttpDeepkitFramework();
    const httpKernel = app.get(HttpKernel);

    framework.sendRequest(httpKernel, request, response);

    await waitForStreamComplete(response);

    const resultBody = ServerlessResponse.body(response);

    expect(resultBody.toString('utf-8')).toEqual(JSON.stringify(body));
    expect(response.statusCode).toBe(200);
    expect(ServerlessResponse.headers(response)).toHaveProperty(
      'response-header',
      'true',
    );
  });
});

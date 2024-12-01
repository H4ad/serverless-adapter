import { App } from '@deepkit/app';
import {
  HttpKernel,
  HttpModule,
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

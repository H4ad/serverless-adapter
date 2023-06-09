import * as trpc from '@trpc/server';
import { AnyRouter } from '@trpc/server';
import { describe, expect, it } from 'vitest';
import {
  NO_OP,
  ServerlessRequest,
  ServerlessResponse,
  getEventBodyAsBuffer,
  waitForStreamComplete,
} from '../../src';
import {
  BufferToJSObjectTransformer,
  TrpcAdapterContext,
  TrpcFramework,
} from '../../src/frameworks/trpc';
import { TestRouteBuilderHandler, frameworkTestOptions } from './utils';

type TrpcContext = TrpcAdapterContext<unknown>;

function createHandler(
  method: 'get' | 'post' | 'delete' | 'put',
): TestRouteBuilderHandler<ReturnType<typeof createRouter>, AnyRouter> {
  return (app, path, handler) => {
    if (method === 'get') {
      return app.router({
        [path]: app.procedure.query(({ ctx, input }) => {
          const [statusCode, resultBody, headers] = handler(
            ctx.getHeaders(),
            input,
          );

          for (const header of Object.keys(headers))
            ctx.setHeader(header, headers[header]);

          ctx.setStatus(statusCode);

          return resultBody;
        }),
      });
    } else {
      return app.router({
        [path]: app.procedure
          .input(inp => inp)
          .mutation(({ ctx, input }) => {
            const [statusCode, resultBody, headers] = handler(
              ctx.getHeaders(),
              input,
            );

            for (const header of Object.keys(headers))
              ctx.setHeader(header, headers[header]);

            ctx.setStatus(statusCode);

            return resultBody;
          }),
      });
    }
  };
}

function createRouter() {
  return trpc.initTRPC.context<TrpcContext>().create();
}

const validTestOptions = frameworkTestOptions.filter(
  ([method]) => method === 'post' || method === 'get',
);

describe('TrpcFramework', () => {
  for (const [
    method,
    path,
    statusCode,
    body,
    expectedValue,
  ] of validTestOptions) {
    const formattedPath = path.replace('/', '').replace(/\//g, '.');
    const requestUrl = '/' + formattedPath;

    it(`${method}:${formattedPath}: should forward request and receive response correctly`, async () => {
      const app = createRouter();
      const handler = createHandler(method);

      const resolvedApp = handler(
        app,
        formattedPath,
        (requestHeaders, requestBody) => {
          expect(requestHeaders).toHaveProperty('request-header', 'true');

          if (
            (method === 'post' || method === 'put') &&
            requestBody !== NO_OP
          ) {
            const parsedRequestBody =
              requestBody instanceof Buffer
                ? JSON.parse(requestBody.toString('utf-8'))
                : requestBody;

            expect(parsedRequestBody).toEqual(body);
          }

          return [statusCode, body, { 'response-header': 'true' }];
        },
      );

      const framework = new TrpcFramework<TrpcAdapterContext<unknown>>();

      const stringBody = body ? JSON.stringify(body) : body;
      const [bufferBody, bodyLength] = stringBody
        ? getEventBodyAsBuffer(stringBody, false)
        : [undefined, 0];

      const request = new ServerlessRequest({
        method: method.toUpperCase(),
        url:
          method !== 'get'
            ? requestUrl
            : requestUrl + `?input=${encodeURIComponent(JSON.stringify(body))}`,
        headers: {
          'content-length': String(bodyLength),
          'request-header': 'true',
          ...(body && {
            'content-type': 'application/json',
          }),
        },
        body: bufferBody,
        remoteAddress: '1.1.1.1',
      });

      const response = new ServerlessResponse({
        method: method.toUpperCase(),
      });

      framework.sendRequest(resolvedApp, request, response);

      await waitForStreamComplete(response);

      const resultBody = ServerlessResponse.body(response);

      expect(
        expectedValue !== undefined
          ? expectedValue
          : JSON.stringify({ result: { data: body } }),
      ).toEqual(resultBody.toString('utf-8'));
      expect(response.statusCode).toBe(statusCode);
      expect(ServerlessResponse.headers(response)).toHaveProperty(
        'response-header',
        'true',
      );
    });
  }

  it('should enable create custom contexts', async () => {
    type Context = { currentDate: Date };
    type CustomContext = TrpcAdapterContext<Context>;

    const currentDate = new Date();
    const t = trpc.initTRPC.context<CustomContext>().create();
    const app = t.router({
      test: t.procedure.query(function ({ ctx }) {
        expect(ctx).toHaveProperty('currentDate');

        ctx.setStatus(201);
      }),
    });

    const request = new ServerlessRequest({
      method: 'GET',
      url: '/test',
      headers: {
        test: 'header',
      },
      body: undefined,
      remoteAddress: '1.1.1.1',
    });

    const firstResponse = new ServerlessResponse({
      method: 'get',
    });

    const secondResponse = new ServerlessResponse({
      method: 'get',
    });

    const firstFramework = new TrpcFramework<TrpcAdapterContext<Context>>({
      createContext: async () => Promise.resolve({ currentDate }),
    });

    const secondFramework = new TrpcFramework<TrpcAdapterContext<Context>>({
      createContext: () => ({ currentDate }),
    });

    firstFramework.sendRequest(app, request, firstResponse);
    secondFramework.sendRequest(app, request, secondResponse);

    await waitForStreamComplete(firstResponse);
    await waitForStreamComplete(secondResponse);

    const firstResultBody = ServerlessResponse.body(firstResponse);
    const secondResultBody = ServerlessResponse.body(secondResponse);

    const emptyResponse = JSON.stringify({
      result: {},
    });

    expect(firstResultBody.toString('utf-8')).toEqual(emptyResponse);
    expect(secondResultBody.toString('utf-8')).toEqual(emptyResponse);
  });

  it('should correctly send default methods inside context', async () => {
    const t = createRouter();
    const app = t.router({
      test: t.procedure.query(({ ctx }) => {
        expect(ctx.request).toBeDefined();
        expect(ctx.response).toBeDefined();

        expect(ctx.getMethod()).toEqual('GET');
        expect(ctx.getUrl()).toEqual('/test');
        expect(ctx.getIp()).toEqual('1.1.1.1');
        expect(ctx.getHeaders()).toHaveProperty('test', 'header');
        expect(ctx.getHeader('test')).toEqual('header');
        expect(ctx.getMethod()).toEqual('GET');

        ctx.setStatus(204);
        ctx.setHeader('test2', 'batata');
        ctx.removeHeader('test2');
      }),
    });

    const framework = new TrpcFramework<TrpcAdapterContext<unknown>>();

    const request = new ServerlessRequest({
      method: 'GET',
      url: '/test',
      headers: {
        test: 'header',
      },
      body: undefined,
      remoteAddress: '1.1.1.1',
    });

    const response = new ServerlessResponse({
      method: 'get',
    });

    framework.sendRequest(app, request, response);

    await waitForStreamComplete(response);

    expect(response.statusCode).toEqual(204);
    expect(response.headers).not.toHaveProperty('test2');
  });
});

describe(BufferToJSObjectTransformer.name, () => {
  it('should correctly parse json when came from buffer', () => {
    const jsonObject = { batata: true };
    const testJson = JSON.stringify(jsonObject);
    const transformer = new BufferToJSObjectTransformer();

    const buffer = Buffer.from(testJson, 'utf-8');

    expect(transformer.deserialize(buffer)).toEqual(jsonObject);
  });

  it('should dont deserialize the value when is not an buffer', () => {
    const values = [Symbol('do nothing'), 'test', 434];
    const transformer = new BufferToJSObjectTransformer();

    for (const value of values)
      expect(transformer.deserialize(value)).toEqual(value);
  });

  it('should dont modify the value when serialize', () => {
    const symbol = Symbol('do nothing');
    const transformer = new BufferToJSObjectTransformer();

    expect(transformer.serialize(symbol)).toEqual(symbol);
  });

  it('should throw error when buffer is not an JSON', () => {
    const xml = '<potato>true</potato>';
    const transformer = new BufferToJSObjectTransformer();

    const buffer = Buffer.from(xml, 'utf-8');

    expect(() => transformer.deserialize(buffer)).toThrow();
  });
});

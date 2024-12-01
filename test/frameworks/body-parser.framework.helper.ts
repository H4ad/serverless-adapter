import * as trpc from '@trpc/server';
import type { Options } from 'body-parser';
import express, { type Express } from 'express';
import express_v5 from 'express-v5';
import fastify, { type FastifyInstance } from 'fastify';
import fastify_v5 from 'fastify-v5';
import Application from 'koa';
import polka from 'polka';
import { type SpyInstance, describe, expect, it, vitest } from 'vitest';
import {
  type FrameworkContract,
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import {
  type BodyParserOptions,
  JsonBodyParserFramework,
  RawBodyParserFramework,
  TextBodyParserFramework,
  UrlencodedBodyParserFramework,
} from '../../src/frameworks/body-parser';
import { ExpressFramework } from '../../src/frameworks/express';
import { FastifyFramework } from '../../src/frameworks/fastify';
import { setNoOpForContentType } from '../../src/frameworks/fastify/helpers/no-op-content-parser';
import { KoaFramework } from '../../src/frameworks/koa';
import { PolkaFramework } from '../../src/frameworks/polka';
import {
  type TrpcAdapterContext,
  TrpcFramework,
} from '../../src/frameworks/trpc';

type BodyParserTest = {
  name: string;
  createFramework: <TApp>(
    framework: FrameworkContract<TApp>,
  ) => FrameworkContract<TApp>;
  body: Buffer;
  contentType: string;
  expectedBody?: any;
  notExpectedBody?: any;
  status: number;
  expectSendRequestOfTheFrameworkToBeCalled: boolean;
  skipFrameworks?: (
    | 'express'
    | 'fastify'
    | 'koa'
    | 'hapi'
    | 'trpc'
    | 'polka'
  )[];
};

const bodyParserOptions: BodyParserTest[] = [
  {
    name: 'json: default behavior',
    createFramework: framework => framework,
    body: Buffer.from(JSON.stringify({ message: 'ok' }), 'utf-8'),
    contentType: 'application/json',
    expectedBody: Buffer.from(JSON.stringify({ message: 'ok' }), 'utf-8'),
    status: 200,
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'json: parse successfuly json',
    createFramework: framework => new JsonBodyParserFramework(framework),
    body: Buffer.from(JSON.stringify({ message: 'ok' }), 'utf-8'),
    contentType: 'application/json',
    expectedBody: { message: 'ok' },
    status: 200,
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'json: error on parse, limit',
    createFramework: framework =>
      new JsonBodyParserFramework(framework, { limit: 4 }),
    body: Buffer.from(JSON.stringify({ message: 'ok' }), 'utf-8'),
    contentType: 'application/json',
    notExpectedBody: JSON.stringify({ message: 'ok' }),
    status: 413,
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'json: error on parse, invalid json',
    createFramework: framework => new JsonBodyParserFramework(framework),
    body: Buffer.from('{"potato":true', 'utf-8'),
    contentType: 'application/json',
    notExpectedBody: '{"potato":true',
    status: 400,
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'json: error on parse, invalid json and strict syntax',
    createFramework: framework =>
      new JsonBodyParserFramework(framework, { strict: true }),
    body: Buffer.from('"potato":true}', 'utf-8'),
    contentType: 'application/json',
    notExpectedBody: '{"potato":true',
    status: 400,
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'text: default behavior',
    createFramework: framework => framework,
    body: Buffer.from('potato=cool', 'utf-8'),
    contentType: 'text/plain',
    expectedBody: Buffer.from('potato=cool', 'utf-8'),
    status: 200,
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'text: parse text',
    createFramework: framework => new TextBodyParserFramework(framework),
    body: Buffer.from('potato=cool', 'utf-8'),
    contentType: 'text/plain',
    expectedBody: 'potato=cool',
    status: 200,
    expectSendRequestOfTheFrameworkToBeCalled: true,
    skipFrameworks: ['trpc'],
  },
  {
    name: 'text: error on size limit',
    createFramework: framework =>
      new TextBodyParserFramework(framework, { limit: 4 }),
    body: Buffer.from('potato=cool', 'utf-8'),
    contentType: 'text/plain',
    notExpectedBody: 'potato=cool',
    status: 413,
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'raw: default behavior',
    createFramework: framework => framework,
    body: Buffer.from('potato=cool', 'utf-8'),
    contentType: 'application/octet-stream',
    expectedBody: Buffer.from('potato=cool', 'utf-8'),
    status: 200,
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'raw: parse raw successfuly',
    createFramework: framework => new RawBodyParserFramework(framework),
    body: Buffer.from('potato=cool', 'utf-8'),
    contentType: 'application/octet-stream',
    expectedBody: Buffer.from('potato=cool', 'utf-8'),
    status: 200,
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'raw: error on size limit',
    createFramework: framework =>
      new RawBodyParserFramework(framework, { limit: 4 }),
    body: Buffer.from('potato=cool', 'utf-8'),
    contentType: 'application/octet-stream',
    notExpectedBody: Buffer.from('potato=cool', 'utf-8'),
    status: 413,
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'urlencoded: default behavior',
    createFramework: framework => framework,
    body: Buffer.from('foo=bar', 'utf-8'),
    contentType: 'application/x-www-form-urlencoded',
    expectedBody: Buffer.from('foo=bar', 'utf-8'),
    status: 200,
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'urlencoded: parse urlencoded',
    createFramework: framework => new UrlencodedBodyParserFramework(framework),
    body: Buffer.from('foo=bar', 'utf-8'),
    contentType: 'application/x-www-form-urlencoded',
    expectedBody: { foo: 'bar' },
    status: 200,
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'urlencoded: parse urlencoded extended',
    createFramework: framework =>
      new UrlencodedBodyParserFramework(framework, { extended: true }),
    body: Buffer.from('foo[bar]=test', 'utf-8'),
    contentType: 'application/x-www-form-urlencoded',
    expectedBody: { foo: { bar: 'test' } },
    status: 200,
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'urlencoded: error on max size',
    createFramework: framework =>
      new UrlencodedBodyParserFramework(framework, { limit: 3 }),
    body: Buffer.from('foo=bar', 'utf-8'),
    contentType: 'application/x-www-form-urlencoded',
    notExpectedBody: { foo: 'bar' },
    status: 413,
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
];

function createFramework<TApp>(
  options: BodyParserTest,
  instance: FrameworkContract<TApp>,
): [
  FrameworkContract<TApp>,
  SpyInstance<Parameters<FrameworkContract<TApp>['sendRequest']>>,
] {
  const spy = vitest.spyOn(instance, 'sendRequest');

  return [options.createFramework(instance), spy];
}

function createRequest(body: Buffer, contentType: string): ServerlessRequest {
  return new ServerlessRequest({
    method: 'POST',
    url: '/body',
    body,
    headers: {
      'content-type': contentType,
      'content-length': Buffer.byteLength(body, 'utf-8').toString(),
      accept: contentType,
    },
  });
}

function createResponse(method: string): ServerlessResponse {
  return new ServerlessResponse({
    method,
  });
}

async function handleRestExpects<TApp>(
  app: TApp,
  framework: FrameworkContract<TApp>,
  bodyParserTestOptions: BodyParserTest,
): Promise<void> {
  const [bodyParserFramework, spySendRequest] = createFramework(
    bodyParserTestOptions,
    framework,
  );

  const request = createRequest(
    bodyParserTestOptions.body,
    bodyParserTestOptions.contentType,
  );
  const response = createResponse(request.method!);

  bodyParserFramework.sendRequest(app, request, response);

  await waitForStreamComplete(response);

  const returnedBody = ServerlessResponse.body(response);

  expect(
    response.statusCode,
    `Got status ${response.statusCode} instead of ${
      bodyParserTestOptions.status
    }. Response Body: ${returnedBody.toString()}`,
  ).toEqual(bodyParserTestOptions.status);

  if (bodyParserTestOptions.expectSendRequestOfTheFrameworkToBeCalled)
    expect(spySendRequest).toHaveBeenCalled();
  else expect(spySendRequest).not.toHaveBeenCalled();
}

export function createBodyParserTests() {
  describe('BodyParserFramework', () => {
    describe('express', () => {
      for (const bodyParserTest of bodyParserOptions) {
        const itFn = bodyParserTest?.skipFrameworks?.includes('express')
          ? it.skip
          : it;

        itFn(bodyParserTest.name, async () => {
          const app = express();

          app.post('/body', (req, res) => {
            if (bodyParserTest.expectedBody)
              expect(req.body).toEqual(bodyParserTest.expectedBody);
            else expect(req.body).not.toEqual(bodyParserTest.notExpectedBody);

            res.send('ok');
          });

          app.use((err, __, res, _) => {
            res.emit('error', err);
          });

          await handleRestExpects(app, new ExpressFramework(), bodyParserTest);
        });
      }
    });

    describe('express-v5', () => {
      for (const bodyParserTest of bodyParserOptions) {
        const itFn = bodyParserTest?.skipFrameworks?.includes('express')
          ? it.skip
          : it;

        itFn(bodyParserTest.name, async () => {
          const app = express_v5();

          app.post('/body', (req, res) => {
            if (bodyParserTest.expectedBody)
              expect(req.body).toEqual(bodyParserTest.expectedBody);
            else expect(req.body).not.toEqual(bodyParserTest.notExpectedBody);

            res.send('ok');
          });

          app.use((err, __, res, _) => {
            res.emit('error', err);
          });

          await handleRestExpects(app, new ExpressFramework(), bodyParserTest);
        });
      }
    });

    describe('fastify', () => {
      for (const bodyParserTest of bodyParserOptions) {
        const itFn = bodyParserTest?.skipFrameworks?.includes('fastify')
          ? it.skip
          : it;

        itFn(bodyParserTest.name, async () => {
          const app = fastify();

          setNoOpForContentType(app, 'application/json');
          setNoOpForContentType(app, 'text/plain');
          setNoOpForContentType(app, 'application/octet-stream');
          setNoOpForContentType(app, 'application/x-www-form-urlencoded');

          app.post('/body', (req, res) => {
            if (bodyParserTest.expectedBody)
              expect(req.body).toEqual(bodyParserTest.expectedBody);
            else expect(req.body).not.toEqual(bodyParserTest.notExpectedBody);

            res.send('ok');
          });

          app.setErrorHandler((err, _req, reply) => {
            reply.raw.emit('error', err);
          });

          await handleRestExpects(app, new FastifyFramework(), bodyParserTest);
        });
      }
    });

    describe('fastify-v5', () => {
      for (const bodyParserTest of bodyParserOptions) {
        const itFn = bodyParserTest?.skipFrameworks?.includes('fastify')
          ? it.skip
          : it;

        itFn(bodyParserTest.name, async () => {
          const app = fastify_v5() as unknown as FastifyInstance;

          setNoOpForContentType(app, 'application/json');
          setNoOpForContentType(app, 'text/plain');
          setNoOpForContentType(app, 'application/octet-stream');
          setNoOpForContentType(app, 'application/x-www-form-urlencoded');

          app.post('/body', (req, res) => {
            if (bodyParserTest.expectedBody)
              expect(req.body).toEqual(bodyParserTest.expectedBody);
            else expect(req.body).not.toEqual(bodyParserTest.notExpectedBody);

            res.send('ok');
          });

          app.setErrorHandler((err, _req, reply) => {
            reply.raw.emit('error', err);
          });

          await handleRestExpects(app, new FastifyFramework(), bodyParserTest);
        });
      }
    });

    describe('koa', () => {
      for (const bodyParserTest of bodyParserOptions) {
        const itFn = bodyParserTest?.skipFrameworks?.includes('koa')
          ? it.skip
          : it;

        itFn(bodyParserTest.name, async () => {
          const app = new Application();

          app.onerror = e => {
            throw e;
          };

          const next = vitest.fn(ctx => {
            const body = ctx.req.body;

            if (bodyParserTest.expectedBody)
              expect(body).toEqual(bodyParserTest.expectedBody);
            else expect(body).not.toEqual(bodyParserTest.notExpectedBody);

            ctx.status = 200;
            ctx.body = 'ok';
          });

          app.use(next);

          await handleRestExpects(app, new KoaFramework(), bodyParserTest);
        });
      }
    });

    describe('hapi', () => {
      for (const bodyParserTest of bodyParserOptions) {
        const itFn = bodyParserTest?.skipFrameworks?.includes('hapi')
          ? it.skip
          : it;

        itFn(bodyParserTest.name, async () => {
          const app = new Application();

          app.use(ctx => {
            const body = (ctx.req as any).body;

            if (bodyParserTest.expectedBody)
              expect(body).toEqual(bodyParserTest.expectedBody);
            else expect(body).not.toEqual(bodyParserTest.notExpectedBody);

            ctx.status = 200;
            ctx.body = 'ok';
          });

          app.onerror = e => {
            throw e;
          };

          await handleRestExpects(app, new KoaFramework(), bodyParserTest);
        });
      }
    });

    describe('trpc', () => {
      for (const bodyParserTest of bodyParserOptions) {
        const itFn = bodyParserTest?.skipFrameworks?.includes('trpc')
          ? it.skip
          : it;

        itFn(bodyParserTest.name, async () => {
          const t = trpc.initTRPC
            .context<TrpcAdapterContext<unknown>>()
            .create();

          const app = t.router({
            body: t.procedure
              .input(inp => inp)
              .mutation(ctx => {
                const body = (ctx.ctx.request as any).body;

                if (bodyParserTest.expectedBody)
                  expect(body).toEqual(bodyParserTest.expectedBody);
                else expect(body).not.toEqual(bodyParserTest.notExpectedBody);

                return 'ok';
              }),
          });

          await handleRestExpects(app, new TrpcFramework(), bodyParserTest);
        });
      }
    });

    describe('polka', () => {
      for (const bodyParserTest of bodyParserOptions) {
        const itFn = bodyParserTest?.skipFrameworks?.includes('polka')
          ? it.skip
          : it;

        itFn(bodyParserTest.name, async () => {
          const app = polka();

          app.post('/body', (req, res) => {
            if (bodyParserTest.expectedBody)
              expect(req.body).toEqual(bodyParserTest.expectedBody);
            else expect(req.body).not.toEqual(bodyParserTest.notExpectedBody);

            res.end('ok');
          });

          await handleRestExpects(app, new PolkaFramework(), bodyParserTest);
        });
      }
    });

    it('should handle correctly on wrong content-encoding', async () => {
      const app = express();

      const expressFramework = new ExpressFramework();
      const bodyParserFramework = new TextBodyParserFramework(expressFramework);

      const request = createRequest(
        Buffer.from('testrandomdata'),
        'text/plain',
      );
      request.headers['content-encoding'] = 'random';

      const response = createResponse('POST');

      bodyParserFramework.sendRequest(app, request, response);

      await waitForStreamComplete(response);

      expect(response.statusCode).toEqual(415);
    });

    describe('customErrorHandler', () => {
      it('should be able to set custom error handler', async () => {
        const app = express();

        const customOptions: Options & BodyParserOptions = {
          limit: 4,
          customErrorHandler: (__, response, _) => {
            response.statusCode = 400;
            response.end('ok');
          },
        };

        const expressFramework = new ExpressFramework();
        const bodyParserFrameworks: [
          framework: FrameworkContract<Express>,
          contentType: string,
        ][] = [
          [
            new TextBodyParserFramework(expressFramework, customOptions),
            'text/plain',
          ],
          [
            new JsonBodyParserFramework(expressFramework, customOptions),
            'application/json',
          ],
          [
            new UrlencodedBodyParserFramework(expressFramework, customOptions),
            'application/x-www-form-urlencoded',
          ],
        ];

        for (const [bodyParserFramework, contentType] of bodyParserFrameworks) {
          const request = createRequest(
            Buffer.from('testrandomdata'),
            contentType,
          );
          const response = createResponse('POST');

          bodyParserFramework.sendRequest(app, request, response);

          await waitForStreamComplete(response);

          const result = ServerlessResponse.body(response);

          expect(result).toEqual(Buffer.from('ok'));
          expect(response.statusCode).toEqual(400);
        }
      });
    });
  });
}

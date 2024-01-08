import * as trpc from '@trpc/server';
import express from 'express';
import fastify from 'fastify';
import Application from 'koa';
import { type SpyInstance, describe, expect, it, vitest } from 'vitest';
import polka from 'polka';
import {
  type BothValueHeaders,
  type FrameworkContract,
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import {
  CorsFramework,
  type CorsFrameworkOptions,
} from '../../src/frameworks/cors';
import { ExpressFramework } from '../../src/frameworks/express';
import { FastifyFramework } from '../../src/frameworks/fastify';
import { KoaFramework } from '../../src/frameworks/koa';
import { TrpcFramework } from '../../src/frameworks/trpc';
import { PolkaFramework } from '../../src/frameworks/polka';

type CorsTest = {
  name: string;
  method: string;
  origin: string;
  options: CorsFrameworkOptions;
  expectedHeaders: BothValueHeaders;
  expectSendRequestOfTheFrameworkToBeCalled: boolean;
};

const AllowOrigin = 'access-control-allow-origin';
const AllowCredentials = 'access-control-allow-credentials';
const AllowMethods = 'access-control-allow-methods';
const MaxAge = 'access-control-max-age';
const AllowHeaders = 'access-control-allow-headers';

const corsOptions: CorsTest[] = [
  {
    name: 'allow all origins',
    method: 'get',
    origin: 'http://localhost:3000',
    options: { origin: '*' },
    expectedHeaders: { [AllowOrigin]: '*' },
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'allow localhost origin (string)',
    method: 'get',
    origin: 'http://localhost:3000',
    options: { origin: 'http://localhost:3000' },
    expectedHeaders: { [AllowOrigin]: 'http://localhost:3000', vary: 'Origin' },
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'allow localhost origin (array)',
    method: 'get',
    origin: 'http://localhost:3000',
    options: { origin: ['http://localhost:3000', 'http://google.com'] },
    expectedHeaders: { [AllowOrigin]: 'http://localhost:3000', vary: 'Origin' },
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'do not send request on options',
    method: 'options',
    origin: 'http://localhost:3000',
    options: { origin: '*' },
    expectedHeaders: {
      [AllowOrigin]: '*',
      [AllowMethods]: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      vary: 'Access-Control-Request-Headers',
    },
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'do not send request when origin sent is wrong (string)',
    method: 'get',
    origin: 'http://localhost:3000',
    options: { origin: 'http://example.com:3000' },
    expectedHeaders: { [AllowOrigin]: 'http://example.com:3000' },
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'do not send request when origin sent is wrong (array)',
    method: 'get',
    origin: 'http://localhost:3000',
    options: { origin: ['http://example.com:3000', 'http://google.com'] },
    expectedHeaders: {
      vary: 'Origin',
    },
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'do not send request when method sent is wrong (string)',
    method: 'get',
    origin: 'http://localhost:3000',
    options: { origin: '*', methods: 'post' },
    expectedHeaders: { [AllowOrigin]: '*' },
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'do not send request when method sent is wrong (array)',
    method: 'get',
    origin: 'http://localhost:3000',
    options: { origin: '*', methods: ['post'] },
    expectedHeaders: { [AllowOrigin]: '*' },
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'force process request when origin is wrong',
    method: 'get',
    origin: 'http://localhost:3000',
    options: {
      origin: 'http://example.com',
      methods: ['post'],
      forbiddenOnInvalidOriginOrMethod: false,
    },
    expectedHeaders: { [AllowOrigin]: 'http://example.com' },
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'when has credentials',
    method: 'options',
    origin: 'http://localhost:3000',
    options: { credentials: true },
    expectedHeaders: {
      [AllowCredentials]: 'true',
    },
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'when preflight continue is true',
    method: 'options',
    origin: 'http://localhost:3000',
    options: { origin: '*', preflightContinue: true },
    expectedHeaders: {
      [AllowOrigin]: '*',
    },
    expectSendRequestOfTheFrameworkToBeCalled: true,
  },
  {
    name: 'when allowed headers is sent',
    method: 'options',
    origin: 'http://localhost:3000',
    options: { allowedHeaders: ['x-test'] },
    expectedHeaders: {
      [AllowHeaders]: 'x-test',
    },
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
  {
    name: 'when max-age is set',
    method: 'options',
    origin: 'http://localhost:3000',
    options: { maxAge: 60 },
    expectedHeaders: {
      [MaxAge]: '60',
    },
    expectSendRequestOfTheFrameworkToBeCalled: false,
  },
];

function createFramework<TApp>(
  options: CorsFrameworkOptions,
  instance: FrameworkContract<TApp>,
): [
  FrameworkContract<TApp>,
  SpyInstance<Parameters<FrameworkContract<TApp>['sendRequest']>>,
] {
  const spy = vitest.spyOn(instance, 'sendRequest');

  return [new CorsFramework(instance, options), spy];
}

function createRequest(method: string, origin: string): ServerlessRequest {
  return new ServerlessRequest({
    method,
    url: '/',
    headers: {
      origin: origin,
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
  corsTest: CorsTest,
): Promise<void> {
  const [corsFramework, spySendRequest] = createFramework(
    corsTest.options,
    framework,
  );

  const request = createRequest(corsTest.method, corsTest.origin);
  const response = createResponse(corsTest.method);

  corsFramework.sendRequest(app, request, response);

  await waitForStreamComplete(response);

  const headers = response.getHeaders();

  for (const expectHeader in corsTest.expectedHeaders) {
    expect(headers).toHaveProperty(
      expectHeader,
      corsTest.expectedHeaders[expectHeader],
    );
  }

  if (corsTest.expectSendRequestOfTheFrameworkToBeCalled)
    expect(spySendRequest).toHaveBeenCalled();
  else expect(spySendRequest).not.toHaveBeenCalled();
}

describe('CorsFramework', () => {
  describe('express', () => {
    for (const corsTest of corsOptions) {
      it(`${corsTest.method}: ${corsTest.name}`, async () => {
        const app = express();

        app.get('/', (_, res) => res.json('ok'));

        await handleRestExpects(app, new ExpressFramework(), corsTest);
      });
    }
  });

  describe('fastify', () => {
    for (const corsTest of corsOptions) {
      it(`${corsTest.method}: ${corsTest.name}`, async () => {
        const app = fastify();

        app.get('/', (_, res) => {
          res.send('ok');
        });

        await handleRestExpects(app, new FastifyFramework(), corsTest);
      });
    }
  });

  describe('koa', () => {
    for (const corsTest of corsOptions) {
      it(`${corsTest.method}: ${corsTest.name}`, async () => {
        const app = new Application();

        app.use(ctx => {
          ctx.status = 200;
          ctx.body = 'ok';
        });

        await handleRestExpects(app, new KoaFramework(), corsTest);
      });
    }
  });

  describe('hapi', () => {
    for (const corsTest of corsOptions) {
      it(`${corsTest.method}: ${corsTest.name}`, async () => {
        const app = new Application();

        app.use(ctx => {
          ctx.status = 200;
          ctx.body = 'ok';
        });

        await handleRestExpects(app, new KoaFramework(), corsTest);
      });
    }
  });

  describe('trpc', () => {
    for (const corsTest of corsOptions) {
      it(`${corsTest.method}: ${corsTest.name}`, async () => {
        const t = trpc.initTRPC.create();

        const app = t.router({
          ['/']: t.procedure.query(() => {
            return 'ok';
          }),
        });

        await handleRestExpects(app, new TrpcFramework(), corsTest);
      });
    }
  });

  describe('polka', () => {
    for (const corsTest of corsOptions) {
      it(`${corsTest.method}: ${corsTest.name}`, async () => {
        const app = polka();

        app.get('/', (_, res) => res.end('ok'));

        await handleRestExpects(app, new PolkaFramework(), corsTest);
      });
    }
  });
});

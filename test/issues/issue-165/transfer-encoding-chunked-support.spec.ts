import { setTimeout } from 'timers/promises';
import { Readable } from 'node:stream';
import { describe, expect, it } from 'vitest';
import express from 'express';
import fastify from 'fastify';
import polka from 'polka';
import { ServerlessAdapter } from '../../../src';
import { DefaultHandler } from '../../../src/handlers/default';
import { PromiseResolver } from '../../../src/resolvers/promise';
import { ExpressFramework } from '../../../src/frameworks/express';
import { AlbAdapter } from '../../../src/adapters/aws';
import { createAlbEvent } from '../../adapters/aws/utils/alb-event';
import { FastifyFramework } from '../../../src/frameworks/fastify';
import { PolkaFramework } from '../../../src/frameworks/polka';

const expectedResult = 'INITIAL PAYLOAD RESPONSE\nFINAL PAYLOAD RESPONSE\n';

describe('Issue 165: cannot handle transfer-encoding: chunked', () => {
  it('express: should handle transfer-encoding: chunked', async () => {
    const app = express();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.get('/chunked-response', async (_req, res) => {
      // Send headers right away
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');
      res.status(200);

      res.write('INITIAL PAYLOAD RESPONSE\n');
      await setTimeout(50);
      res.end('FINAL PAYLOAD RESPONSE\n');
    });

    const albEvent = createAlbEvent('GET', '/chunked-response');

    const handler = ServerlessAdapter.new(app)
      .setHandler(new DefaultHandler())
      .setFramework(new ExpressFramework())
      .setResolver(new PromiseResolver())
      .addAdapter(new AlbAdapter())
      .build();

    const result = await handler(albEvent, {});

    expect(result.body).toEqual(expectedResult);
    expect(result.headers['content-length'], expectedResult.length.toString());
  });

  it('fastify: should handle transfer-encoding: chunked', async () => {
    const app = fastify();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.get('/chunked-response', async (_req, res) => {
      // Send headers right away
      res.type('text/plain');
      res.header('Transfer-Encoding', 'chunked');
      res.status(200);

      const buffer = new Readable();
      buffer._read = () => {};

      res.send(buffer);

      buffer.push('INITIAL PAYLOAD RESPONSE\n');
      await setTimeout(50);
      buffer.push('FINAL PAYLOAD RESPONSE\n');
      buffer.push(null);
    });

    const albEvent = createAlbEvent('GET', '/chunked-response');

    const handler = ServerlessAdapter.new(app)
      .setHandler(new DefaultHandler())
      .setFramework(new FastifyFramework())
      .setResolver(new PromiseResolver())
      .addAdapter(new AlbAdapter())
      .build();

    const result = await handler(albEvent, {});

    expect(result.body).toEqual(expectedResult);
    expect(result.headers['content-length'], expectedResult.length.toString());
  });

  it('polka: should handle transfer-encoding: chunked', async () => {
    const app = polka();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.get('/chunked-response', async (_req, res) => {
      // Send headers right away
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');
      res.statusCode = 200;

      res.write('INITIAL PAYLOAD RESPONSE\n');
      await setTimeout(50);
      res.end('FINAL PAYLOAD RESPONSE\n');
    });

    const albEvent = createAlbEvent('GET', '/chunked-response');

    const handler = ServerlessAdapter.new(app)
      .setHandler(new DefaultHandler())
      .setFramework(new PolkaFramework())
      .setResolver(new PromiseResolver())
      .addAdapter(new AlbAdapter())
      .build();

    const result = await handler(albEvent, {});

    expect(result.body).toEqual(expectedResult);
    expect(result.headers['content-length'], expectedResult.length.toString());
  });
});

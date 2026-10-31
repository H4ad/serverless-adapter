import type { Request, Response } from 'express';
import express from 'express';
import { PNG_1X1, largeBody, sha256 } from './payloads';

export interface FixtureOptions {
  /**
   * Called with the raw body the adapter forwarded for an event source. The
   * AWS function writes it to the log so the smoke can read it back.
   */
  onEventResult?: (source: string, body: Buffer) => void;
}

const EVENT_SOURCES = ['sqs', 'sns', 's3', 'dynamodb', 'eventbridge'];

function bodyOf(request: Request): Buffer {
  return Buffer.isBuffer(request.body) ? request.body : Buffer.alloc(0);
}

function multiHeader(request: Request, name: string): string | string[] | null {
  const value = request.headers[name];

  return value === undefined ? null : value;
}

/**
 * One app for every cloud. The routes are the contract the smoke asserts, so
 * a behaviour change in an adapter shows up the same way on every provider.
 */
export function createApp(options: FixtureOptions = {}): express.Express {
  const app = express();

  app.disable('x-powered-by');
  app.disable('etag');
  app.set('query parser', 'extended');
  app.use(express.raw({ type: () => true, limit: '4mb' }));

  app.get('/health', (_request: Request, response: Response) => {
    response.json({ ok: true });
  });

  const echo = (request: Request, response: Response): void => {
    const body = bodyOf(request);

    response.json({
      method: request.method,
      path: request.path,
      query: request.query,
      bodyBase64: body.toString('base64'),
      bodyLength: body.length,
      bodySha256: sha256(body),
      contentType: request.headers['content-type'] ?? null,
      selectedHeaders: {
        host: request.headers.host ?? null,
        'x-test': request.headers['x-test'] ?? null,
        'x-multi': multiHeader(request, 'x-multi'),
        'user-agent': request.headers['user-agent'] ?? null,
      },
    });
  };

  app.all('/echo', echo);

  app.get('/binary', (_request: Request, response: Response) => {
    response.type('image/png').send(PNG_1X1);
  });

  app.get('/large', (_request: Request, response: Response) => {
    response.type('text/plain').send(largeBody());
  });

  app.get('/status/:code', (request: Request, response: Response) => {
    const code = Number(request.params.code);

    if (!Number.isInteger(code) || code < 200 || code > 599) {
      response
        .status(400)
        .json({ error: 'invalid status code', code: request.params.code });

      return;
    }

    response.status(code).end();
  });

  app.get('/cookies', (_request: Request, response: Response) => {
    response.cookie('e2e_a', '1').cookie('e2e_b', '2').json({ ok: true });
  });

  app.get('/headers', (request: Request, response: Response) => {
    const raw: string[] = [];

    for (let index = 0; index < request.rawHeaders.length; index += 2) {
      if (request.rawHeaders[index].toLowerCase() !== 'x-multi') continue;

      raw.push(request.rawHeaders[index + 1]);
    }

    response.json({
      multi: multiHeader(request, 'x-multi'),
      raw,
    });
  });

  app.get('/ip', (request: Request, response: Response) => {
    response.json({ ip: request.socket.remoteAddress ?? null });
  });

  app.get('/stream', (_request: Request, response: Response) => {
    response.type('text/plain');
    response.write('chunk-1');
    response.write('chunk-2');
    response.end('chunk-3');
  });

  for (const source of EVENT_SOURCES) {
    app.post(`/${source}`, (request: Request, response: Response) => {
      const body = bodyOf(request);

      options.onEventResult?.(source, body);

      response.json({ ok: true, source, length: body.length });
    });
  }

  app.use((request: Request, response: Response) => {
    response.status(404).json({ error: 'not found', path: request.path });
  });

  return app;
}

import type {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions-v4';
import { app } from '@azure/functions-v4';
import { HttpTriggerV4Adapter } from '../../../src/adapters/azure';
import { ExpressFramework } from '../../../src/frameworks/express';
import { AzureHandlerV3 } from '../../../src/handlers/azure';
import { PromiseResolver } from '../../../src/resolvers/promise';
import { ServerlessAdapter } from '../../../src/serverless-adapter';
import { createApp } from '@e2e/core/fixture/app';

const expressApp = createApp();

const handler = ServerlessAdapter.new(expressApp)
  .setFramework(new ExpressFramework())
  .setHandler(new AzureHandlerV3<any, HttpRequest, any, any, any>())
  .setResolver(new PromiseResolver())
  // The v4 runtime serves functions under /api, and the adapter builds the
  // request path from the full URL.
  .addAdapter(new HttpTriggerV4Adapter({ stripBasePath: '/api' }))
  .build();

/**
 * The library's Azure handler is shaped for the v2/v3 context object. The v4
 * runtime passes a flat InvocationContext, so this shim is the only glue the
 * e2e fixture needs.
 */
function toV3Context(context: InvocationContext): Record<string, unknown> {
  return {
    invocationId: context.invocationId,
    functionName: context.functionName,
    log: {
      error: context.error.bind(context),
      info: context.info.bind(context),
      warn: context.warn.bind(context),
      verbose: context.debug.bind(context),
    },
  };
}

/**
 * The adapter walks `headers` and `query` with Object.keys. The v4 runtime
 * passes a Headers instance and a URLSearchParams, which have no enumerable
 * keys, so the request is flattened here before it reaches the adapter. The
 * body is read once into a Buffer because v4 exposes a stream and the adapter
 * expects the bytes synchronously.
 */
async function toV3Request(
  request: HttpRequest,
): Promise<Record<string, unknown>> {
  const headers: Record<string, string> = {};

  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const query: Record<string, string | string[]> = {};

  for (const key of new Set(request.query.keys())) {
    const values = request.query.getAll(key);
    query[key] = values.length > 1 ? values : values[0];
  }

  const rawBody = request.body
    ? Buffer.from(await request.arrayBuffer())
    : undefined;

  return {
    method: request.method,
    url: request.url,
    headers,
    query,
    params: request.params,
    // Truthy check in the adapter; the bytes come from rawBody.
    body: request.body,
    rawBody,
  };
}

app.http('api', {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  authLevel: 'anonymous',
  route: '{*segments}',
  async handler(
    request: HttpRequest,
    context: InvocationContext,
  ): Promise<HttpResponseInit> {
    const event = await toV3Request(request);

    return (await handler(toV3Context(context), event)) as HttpResponseInit;
  },
});

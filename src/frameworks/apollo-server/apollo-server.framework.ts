//#region

import { IncomingMessage, ServerResponse } from 'http';
import { ApolloServer, BaseContext, ContextFunction } from '@apollo/server';
import { FrameworkContract } from '../../contracts';
import { ServerlessRequest } from '../../network';
import { getDefaultIfUndefined } from '../../core';

//#endregion

/**
 * The arguments used to create a Context inside {@link ApolloServerOptions}
 *
 * @breadcrumb Frameworks / ApolloServerFramework
 * @public
 */
export type ApolloServerContextArguments = [
  { request: IncomingMessage; response: ServerResponse },
];

/**
 * The options to customize {@link ApolloServerFramework}
 *
 * @breadcrumb Frameworks / ApolloServerFramework
 * @public
 */
export interface ApolloServerOptions<TContext extends BaseContext> {
  context: ContextFunction<ApolloServerContextArguments, TContext>;
}

/**
 * The framework that forwards requests to Apollo Server
 *
 * @breadcrumb Frameworks / ApolloServerFramework
 * @public
 */
export class ApolloServerFramework<TContext extends BaseContext>
  implements FrameworkContract<ApolloServer<TContext>>
{
  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(protected readonly options?: ApolloServerOptions<TContext>) {}

  //#endregion

  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: ApolloServer<TContext>,
    request: ServerlessRequest,
    response: ServerResponse,
  ): void {
    const headers = new Map<string, string>();

    for (const [key, value] of Object.entries(request.headers)) {
      if (value === undefined) continue;

      headers.set(key, Array.isArray(value) ? value.join(', ') : value);
    }

    const defaultContext: ContextFunction<
      ApolloServerContextArguments,
      any
    > = context => Promise.resolve(context);

    const context = () =>
      getDefaultIfUndefined(
        this.options?.context,
        defaultContext,
      )({ request, response });

    const search = request.url?.startsWith('http')
      ? new URL(request.url).search ?? ''
      : request.url?.split('?')[1] || '';

    let body: string = '{}';

    if (request.body instanceof Buffer) body = request.body.toString('utf-8');
    else if (request.body && typeof request.body === 'object')
      body = JSON.stringify(request.body);

    app
      .executeHTTPGraphQLRequest({
        httpGraphQLRequest: {
          method: request.method!.toUpperCase(),
          headers,
          body: JSON.parse(body),
          search,
        },
        context,
      })
      .then(async httpGraphQLResponse => {
        for (const [key, value] of httpGraphQLResponse.headers)
          response.setHeader(key, value);

        response.statusCode = httpGraphQLResponse.status || 200;

        if (httpGraphQLResponse.body.kind === 'complete') {
          response.end(httpGraphQLResponse.body.string);
          return;
        }

        for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
          response.write(chunk);
          // Express/Node doesn't define a way of saying "it's time to send this
          // data over the wire"... but the popular `compression` middleware
          // (which implements `accept-encoding: gzip` and friends) does, by
          // monkey-patching a `flush` method onto the response. So we call it
          // if it's there.
          if (typeof (response as any).flush === 'function')
            (response as any).flush();
        }

        response.end();
      })
      .catch(err => {
        response.destroy(err);
      });
  }
}

//#region

import type { IncomingMessage, ServerResponse } from 'http';
import { type ApolloServer, type BaseContext, HeaderMap } from '@apollo/server';
import type { FrameworkContract } from '../../contracts';
import { ServerlessRequest } from '../../network';
import { getDefaultIfUndefined } from '../../core';

//#endregion

/**
 * The default context of Apollo Server when you integrate and don't pass any context.
 *
 * @breadcrumb Frameworks / ApolloServerFramework
 * @public
 */
export interface DefaultServerlessApolloServerContext extends BaseContext {
  /**
   * The request reference
   */
  request: IncomingMessage;
  /**
   * The response reference
   */
  response: ServerResponse;
}

/**
 * The arguments used to create a Context inside {@link ApolloServerOptions}
 *
 * @breadcrumb Frameworks / ApolloServerFramework
 * @public
 */
export type ApolloServerContextArguments = {
  /**
   * The request reference
   */
  request: IncomingMessage;
  /**
   * The response reference
   */
  response: ServerResponse;
};

/**
 * The options to customize {@link ApolloServerFramework}
 *
 * @breadcrumb Frameworks / ApolloServerFramework
 * @public
 */
export interface ApolloServerOptions<TContext extends BaseContext> {
  /**
   * Define a function to create the context of Apollo Server
   *
   * @param options - Default options passed by library
   */
  context?: (options: ApolloServerContextArguments) => Promise<TContext>;
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
    const headers = new HeaderMap();

    for (const [key, value] of Object.entries(request.headers)) {
      if (value === undefined) continue;

      headers.set(
        key,
        Array.isArray(value) ? value.join(', ') : value.toString(),
      );
    }

    const defaultContext: ApolloServerOptions<any>['context'] = context =>
      Promise.resolve(context);

    const context = () =>
      getDefaultIfUndefined(
        this.options?.context,
        defaultContext,
      )({ request, response });

    const search = request.url?.startsWith('http')
      ? (new URL(request.url).search ?? '')
      : request.url?.split('?')[1] || '';

    // we don't need to handle catch because of https://www.apollographql.com/docs/apollo-server/integrations/building-integrations/#handle-errors
    app
      .executeHTTPGraphQLRequest({
        httpGraphQLRequest: {
          method: request.method!.toUpperCase(),
          headers,
          body: request.body,
          search,
        },
        context,
      })
      .then(async httpGraphQLResponse => {
        // this section was copy and pasted from https://github.com/apollographql/apollo-server/blob/main/packages/server/src/express4/index.ts#L95

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
      });
  }
}

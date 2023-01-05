//#region

import { IncomingMessage, ServerResponse } from 'http';
import type { AnyRouter, DataTransformer } from '@trpc/server';
import {
  NodeHTTPCreateContextFn,
  NodeHTTPCreateContextFnOptions,
  NodeHTTPHandlerOptions,
  nodeHTTPRequestHandler,
} from '@trpc/server/adapters/node-http';
import { SingleValueHeaders } from '../../@types';
import { FrameworkContract } from '../../contracts';
import { getDefaultIfUndefined, getFlattenedHeadersMap } from '../../core';

//#endregion

/**
 * The transformer that is responsible to transform buffer's input to javascript objects
 *
 * @deprecated You should use {@link JsonBodyParserFramework} instead, is more reliable and enable you to use transformer of trpc to other things.
 * @breadcrumb Frameworks / TrpcFramework
 * @public
 */
export class BufferToJSObjectTransformer implements DataTransformer {
  /**
   * Deserialize unknown values to javascript objects
   *
   * @param value - The value to be deserialized
   */
  public deserialize(value?: unknown): any {
    if (value instanceof Buffer) return JSON.parse(value.toString('utf-8'));

    return value;
  }

  /**
   * The value to be serialized, do nothing because tRPC can handle.
   *
   * @param value - The value to be serialized
   */
  public serialize(value: any): any {
    return value;
  }
}

/**
 * The context created by this library that allows getting some information from the request and setting the status and header of the response.
 *
 * @breadcrumb Frameworks / TrpcFramework
 * @public
 */
export interface TrpcAdapterBaseContext {
  /**
   * The request object that will be forward to your app
   */
  request: IncomingMessage;

  /**
   * The response object that will be forward to your app to output the response
   */
  response: ServerResponse;

  /**
   * The method to set response status.
   *
   * @param statusCode - The response status that you want
   */
  setStatus(statusCode: number): void;

  /**
   * The method to set some header in the response
   *
   * @param name - The name of the header
   * @param value - The value to be set in the header
   */
  setHeader(name: string, value: number | string): void;

  /**
   * The method to remove some header from the response
   *
   * @param name - The name of the header
   */
  removeHeader(name: string): void;

  /**
   * The method to return the value of some header from the request
   *
   * @param name - The name of the header
   */
  getHeader(name: string): string | undefined;

  /**
   * The method to return the request headers
   */
  getHeaders(): SingleValueHeaders;

  /**
   * The method to return user's address
   */
  getIp(): string | undefined;

  /**
   * The method to return the URL called
   */
  getUrl(): string | undefined;

  /**
   * The method to return the HTTP Method in the request
   */
  getMethod(): string | undefined;
}

/**
 * This is the context merged between {@link TrpcAdapterBaseContext} and the {@link TContext} that you provided.
 *
 * This context will be merged with the context you created with `createContext` inside {@link TrpcFrameworkOptions}.
 * So to make the type work, just send the properties you've added inside {@link TContext}.
 *
 * @example
 * ```typescript
 * type MyCustomContext = { user: { name: string } };
 * type TrpcContext = TrpcAdapterContext<MyCustomContext>; // your final context type to put inside trpc.router
 * ```
 *
 * @breadcrumb Frameworks / TrpcFramework
 * @public
 */
export type TrpcAdapterContext<TContext> = TContext & TrpcAdapterBaseContext;

/**
 * The options to customize the {@link TrpcFramework}
 *
 * @breadcrumb Frameworks / TrpcFramework
 * @public
 */
export type TrpcFrameworkOptions<TContext> = Omit<
  NodeHTTPHandlerOptions<AnyRouter<TContext>, IncomingMessage, ServerResponse>,
  'router' | 'createContext'
> & {
  createContext?: (
    opts: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>,
  ) =>
    | Omit<TContext, keyof TrpcAdapterBaseContext>
    | Promise<Omit<TContext, keyof TrpcAdapterBaseContext>>;
};

/**
 * The framework that forwards requests to TRPC handler
 *
 * @breadcrumb Frameworks / TrpcFramework
 * @public
 */
export class TrpcFramework<TContext extends TrpcAdapterBaseContext>
  implements FrameworkContract<AnyRouter<TContext>>
{
  //#region Constructor

  /**
   * Default constructor
   */
  constructor(protected readonly options?: TrpcFrameworkOptions<TContext>) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: AnyRouter<TContext>,
    request: IncomingMessage,
    response: ServerResponse,
  ): void {
    const endpoint = this.getSafeUrlForTrpc(request);

    nodeHTTPRequestHandler({
      req: request,
      res: response,
      path: endpoint,
      router: app,
      ...this.options,
      createContext: createContextOptions =>
        this.mergeDefaultContextWithOptionsContext(createContextOptions),
    });
  }

  //#endregion

  //#region Protected Methods

  /**
   * Get safe url that can be used inside Trpc.
   *
   * @example
   * ```typescript
   * const url = getSafeUrlForTrpc('/users?input=hello');
   * console.log(url); // users
   * ```
   *
   * @param request - The request object that will be forward to your app
   */
  protected getSafeUrlForTrpc(request: IncomingMessage): string {
    let url = request.url!;

    if (url.startsWith('/')) url = url.slice(1);

    if (url.includes('?')) url = url.split('?')[0];

    return url;
  }

  /**
   * Merge the default context ({@link TrpcAdapterContext}) with the context created by the user.
   *
   * @param createContextOptions - The options sent by trpc to create the context
   */
  protected mergeDefaultContextWithOptionsContext(
    createContextOptions: NodeHTTPCreateContextFnOptions<
      IncomingMessage,
      ServerResponse
    >,
  ): TContext | Promise<TContext> {
    const createContextFromOptions: NodeHTTPCreateContextFn<
      AnyRouter<Omit<TContext, keyof TrpcAdapterBaseContext>>,
      IncomingMessage,
      ServerResponse
    > = getDefaultIfUndefined(
      this.options?.createContext,
      () =>
        undefined as unknown as Omit<TContext, keyof TrpcAdapterBaseContext>,
    );

    const resolvedContext = createContextFromOptions(createContextOptions);

    if (resolvedContext && resolvedContext.then) {
      return resolvedContext.then(context =>
        this.wrapResolvedContextWithDefaultContext(
          context,
          createContextOptions,
        ),
      );
    }

    return this.wrapResolvedContextWithDefaultContext(
      resolvedContext,
      createContextOptions,
    );
  }

  /**
   * Wraps the resolved context from the {@link TrpcFrameworkOptions} created with `createContext` and merge
   * with the {@link TrpcAdapterContext} generated by the library.
   *
   * @param resolvedContext - The context created with `createContext` inside {@link TrpcFrameworkOptions}
   * @param createContextOptions - The options sent by trpc to create the context
   */
  protected wrapResolvedContextWithDefaultContext(
    resolvedContext: TContext,
    createContextOptions: NodeHTTPCreateContextFnOptions<
      IncomingMessage,
      ServerResponse
    >,
  ): TContext {
    const request = createContextOptions.req;
    const response = createContextOptions.res;

    return {
      ...resolvedContext,
      request,
      response,
      getUrl: () => request.url,
      getMethod: () => request.method,
      getHeaders: () => getFlattenedHeadersMap(request.headers, ',', true),
      setHeader: (header, value) => {
        response.setHeader(header, value);
      },
      removeHeader: header => {
        response.removeHeader(header);
      },
      getHeader: (header: string) => {
        return getFlattenedHeadersMap(request.headers, ',', true)[
          header.toLowerCase()
        ];
      },
      setStatus: (statusCode: number) => {
        response.statusCode = statusCode;
        // force undefined to get default message for the status code
        // ref: https://nodejs.org/dist/latest-v16.x/docs/api/http.html#responsestatusmessage
        response.statusMessage = undefined as any;
      },
      getIp: () => request.connection.remoteAddress,
    };
  }

  //#endregion
}

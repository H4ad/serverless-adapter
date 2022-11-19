//#region Imports

import { IncomingMessage, ServerResponse } from 'http';
import cors, { CorsOptions } from 'cors';
import { FrameworkContract } from '../../contracts';
import { getDefaultIfUndefined } from '../../core';

//#endregion

/**
 * The options to customize {@link CorsFramework}
 *
 * @breadcrumb Frameworks / CorsFramework
 * @public
 */
export type CorsFrameworkOptions = CorsOptions & {
  /**
   * Send error 403 when cors is invalid. From what I read in `cors`, `fastify/cors` and [this problem](https://stackoverflow.com/questions/57212248/why-is-http-request-been-processed-in-action-even-when-cors-is-not-enabled)
   * it is normal to process the request even if the origin is invalid.
   * So this option will respond with error if this method was called from an invalid origin (or not allowed method) like [access control lib](https://github.com/primus/access-control/blob/master/index.js#L95-L115) .
   *
   * @defaultValue true
   */
  forbiddenOnInvalidOriginOrMethod?: boolean;
};

/**
 * The framework that handles cors for your api without relying on internals of the framework
 *
 * @example
 * ```typescript
 * import express from 'express';
 * import { ServerlessAdapter } from '@h4ad/serverless-adapter';
 * import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
 * import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';
 *
 * const expressFramework = new ExpressFramework();
 * const options: CorsOptions = {}; // customize the options
 * const framework = new CorsFramework(expressFramework, options);
 *
 * export const handler = ServerlessAdapter.new(null)
 *   .setFramework(framework)
 *   // set other configurations and then build
 *   .build();
 * ```
 *
 * @breadcrumb Frameworks / CorsFramework
 * @public
 */
export class CorsFramework<TApp> implements FrameworkContract<TApp> {
  //#region Constructor

  /**
   * Default Constructor
   */
  constructor(
    protected readonly framework: FrameworkContract<TApp>,
    protected readonly options?: CorsFrameworkOptions,
  ) {
    this.cachedCorsInstance = cors(this.options);
  }

  //#endregion

  /**
   * All cors headers that can be added by cors package
   */
  protected readonly corsHeaders: string[] = [
    'Access-Control-Max-Age',
    'Access-Control-Expose-Headers',
    'Access-Control-Allow-Headers',
    'Access-Control-Request-Headers',
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Origin',
  ];

  /**
   * The cached instance of cors
   */
  protected readonly cachedCorsInstance: ReturnType<typeof cors>;

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: TApp,
    request: IncomingMessage,
    response: ServerResponse,
  ): void {
    this.cachedCorsInstance(
      request,
      response,
      this.onCorsNext(app, request, response),
    );
  }

  //#endregion

  //#region Protected Methods

  /**
   * Handle next execution called by the cors package
   */
  protected onCorsNext(
    app: TApp,
    request: IncomingMessage,
    response: ServerResponse,
  ): () => void {
    return () => {
      this.formatHeaderValuesAddedByCorsPackage(response);

      const errorOnInvalidOrigin = getDefaultIfUndefined(
        this.options?.forbiddenOnInvalidOriginOrMethod,
        true,
      );

      if (errorOnInvalidOrigin) {
        const allowedOrigin = response.getHeader('access-control-allow-origin');
        const isInvalidOrigin = this.isInvalidOriginOrMethodIsNotAllowed(
          request,
          allowedOrigin,
        );

        if (isInvalidOrigin) {
          response.statusCode = 403;
          response.setHeader('Content-Type', 'text/plain');
          response.end(
            [
              'Invalid HTTP Access Control (CORS) request:',
              `  Origin: ${request.headers.origin}`,
              `  Method: ${request.method}`,
            ].join('\n'),
          );

          return;
        }
      }

      this.framework.sendRequest(app, request, response);
    };
  }

  /**
   * Format the headers to be standardized with the rest of the library, such as ApiGatewayV2.
   * Also, some frameworks don't support headers as an array, so we need to format the values.
   */
  protected formatHeaderValuesAddedByCorsPackage(
    response: ServerResponse,
  ): void {
    for (const corsHeader of this.corsHeaders) {
      const value = response.getHeader(corsHeader);

      if (value === undefined) continue;

      response.removeHeader(corsHeader);
      response.setHeader(
        corsHeader.toLowerCase(),
        Array.isArray(value) ? value.join(',') : value,
      );
    }
  }

  /**
   * Check if the origin is invalid or if the method is not allowed.
   * Highly inspired by [access-control](https://github.com/primus/access-control/blob/master/index.js#L95-L115)
   */
  protected isInvalidOriginOrMethodIsNotAllowed(
    request: IncomingMessage,
    allowedOrigin: number | string | string[] | undefined,
  ): boolean {
    if (!allowedOrigin) return true;

    if (
      !!request.headers.origin &&
      allowedOrigin !== '*' &&
      request.headers.origin !== allowedOrigin
    )
      return true;

    const notPermitedInMethods =
      this.options &&
      Array.isArray(this.options.methods) &&
      this.options.methods.every(
        m => m.toLowerCase() !== request.method?.toLowerCase(),
      );
    const differentMethod =
      this.options &&
      typeof this.options.methods === 'string' &&
      this.options.methods
        .split(',')
        .every(m => m.trim().toLowerCase() !== request.method?.toLowerCase());

    if (this.options?.methods && (notPermitedInMethods || differentMethod))
      return true;

    return false;
  }

  //#endregion
}

//#region Imports

import { IncomingMessage, ServerResponse } from 'http';
import type { NextHandleFunction } from 'connect';
import type { HttpError } from 'http-errors';
import { FrameworkContract } from '../../contracts';
import { getDefaultIfUndefined } from '../../core';

//#endregion

/**
 * The options for {@link BaseBodyParserFramework}
 */
export type BodyParserOptions = {
  /**
   * Implements a custom way of handling error.
   *
   * @defaultValue {@link BaseBodyParserFramework.defaultHandleOnError}
   *
   * @example
   * ```typescript
   * customErrorHandler: (req: IncomingMessage, response: ServerResponse, error: HttpError<any>) => {
   *   response.setHeader('content-type', 'text/plain');
   *   response.statusCode = error.statusCode;
   *   // always call end to return the error
   *   response.end(error.message);
   * }
   * ```
   *
   * @param request - The referecene for request
   * @param response - The reference for response
   * @param error - The error throwed by body-parser
   */
  customErrorHandler?: (
    request: IncomingMessage,
    response: ServerResponse,
    error: HttpError<any>,
  ) => void;
};

/**
 * The base class used by other body-parser functions to parse a specific content-type
 *
 * @breadcrumb Frameworks / BodyParserFramework
 * @public
 */
export class BaseBodyParserFramework<TApp> implements FrameworkContract<TApp> {
  //#region Constructor

  /**
   * Default Constructor
   */
  protected constructor(
    protected readonly framework: FrameworkContract<TApp>,
    protected readonly middleware: NextHandleFunction,
    protected readonly options?: BodyParserOptions,
  ) {
    this.errorHandler = getDefaultIfUndefined(
      this.options?.customErrorHandler,
      this.defaultHandleOnError.bind(this),
    );
  }

  //#endregion

  //#region Protected Properties

  /**
   * The selected error handler
   */
  protected readonly errorHandler: NonNullable<
    BodyParserOptions['customErrorHandler']
  >;

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: TApp,
    request: IncomingMessage,
    response: ServerResponse,
  ): void {
    this.middleware(
      request,
      response,
      this.onBodyParserFinished(app, request, response),
    );
  }

  //#endregion

  //#region Protected Methods

  /**
   * Handle next execution called by the cors package
   */
  protected onBodyParserFinished(
    app: TApp,
    request: IncomingMessage,
    response: ServerResponse,
  ): () => void {
    return (err?: any) => {
      if (err) return this.errorHandler(request, response, err);

      this.framework.sendRequest(app, request, response);
    };
  }

  /**
   * The default function to handle errors
   *
   * @param request - The referecene for request
   * @param response - The reference for response
   * @param error - The error throwed by body-parser
   */
  protected defaultHandleOnError(
    request: IncomingMessage,
    response: ServerResponse,
    error: HttpError<any>,
  ): void {
    response.setHeader('content-type', 'text/plain');
    response.statusCode = error.statusCode;
    response.end(error.message);
  }

  //#endregion
}

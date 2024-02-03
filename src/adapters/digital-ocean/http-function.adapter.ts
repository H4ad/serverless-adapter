//#region Imports

//#region Imports

import type {
  DigitalOceanHttpEvent,
  DigitalOceanHttpResponse,
} from '../../@types/digital-ocean';
import type {
  AdapterContract,
  AdapterRequest,
  GetResponseAdapterProps,
  OnErrorProps,
} from '../../contracts';
import {
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
  getFlattenedHeadersMap,
  getPathWithQueryStringParams,
} from '../../core';

//#endregion

/**
 * The options to customize the {@link HttpFunctionAdapter}
 *
 * @breadcrumb Adapters / Digital Ocean / HttpFunctionAdapter
 * @public
 */
export interface HttpFunctionAdapterOptions {
  /**
   * Strip base path for custom domains
   *
   * @defaultValue ''
   */
  stripBasePath?: string;
}

/**
 * The adapter to handle requests from Digital Ocean Functions when called from HTTP Endpoint.
 *
 * @example
 * ```typescript
 * const stripBasePath = '/any/custom/base/path'; // default ''
 * const adapter = new HttpFunctionAdapter({ stripBasePath });
 * ```
 *
 * @breadcrumb Adapters / Digital Ocean / HttpFunctionAdapter
 * @public
 */
export class HttpFunctionAdapter
  implements
    AdapterContract<DigitalOceanHttpEvent, void, DigitalOceanHttpResponse>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link HttpFunctionAdapter}
   */
  constructor(protected readonly options?: HttpFunctionAdapterOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return HttpFunctionAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown): event is DigitalOceanHttpEvent {
    const digitalOceanHttpEvent = event as DigitalOceanHttpEvent;

    return (
      !!digitalOceanHttpEvent &&
      digitalOceanHttpEvent.http?.path !== undefined &&
      digitalOceanHttpEvent.http?.method !== undefined &&
      digitalOceanHttpEvent.http?.headers !== undefined
    );
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(event: DigitalOceanHttpEvent): AdapterRequest {
    const headers = event.http.headers;
    const method = event.http.method.toUpperCase();
    const path = this.getPathFromEvent(event);

    let body: Buffer | undefined;

    if (event.http.body) {
      const [bufferBody, contentLength] = getEventBodyAsBuffer(
        event.http.body,
        !!event.http.isBase64Encoded,
      );

      body = bufferBody;
      headers['content-length'] = String(contentLength);
    }

    const remoteAddress = headers['x-forwarded-for'];

    return {
      method,
      headers,
      body,
      remoteAddress,
      path,
    };
  }

  /**
   * {@inheritDoc}
   */
  public getResponse({
    headers: responseHeaders,
    body,
    statusCode,
  }: GetResponseAdapterProps<DigitalOceanHttpEvent>): DigitalOceanHttpResponse {
    const headers = getFlattenedHeadersMap(responseHeaders);

    return {
      statusCode,
      body,
      headers,
    };
  }

  /**
   * {@inheritDoc}
   */
  public onErrorWhileForwarding({
    error,
    delegatedResolver,
    respondWithErrors,
    event,
    log,
  }: OnErrorProps<DigitalOceanHttpEvent, DigitalOceanHttpResponse>): void {
    const body = respondWithErrors ? error.stack : '';
    const errorResponse = this.getResponse({
      event,
      statusCode: 500,
      body: body || '',
      headers: {},
      isBase64Encoded: false,
      log,
    });

    delegatedResolver.succeed(errorResponse);
  }

  //#endregion

  //#region Protected Methods

  /**
   * Get path from event with query strings
   *
   * @param event - The event sent by digital ocean
   */
  protected getPathFromEvent(event: DigitalOceanHttpEvent): string {
    const stripBasePath = getDefaultIfUndefined(
      this.options?.stripBasePath,
      '',
    );
    const replaceRegex = new RegExp(`^${stripBasePath}`);

    const path = event.http.path.replace(replaceRegex, '');
    const queryParams = event.http.queryString;

    return getPathWithQueryStringParams(path, queryParams || {});
  }

  //#endregion
}

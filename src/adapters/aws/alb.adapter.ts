//#region Imports

import type { ALBEvent, ALBResult, Context } from 'aws-lambda';
import {
  AdapterContract,
  AdapterRequest,
  GetResponseAdapterProps,
  OnErrorProps,
} from '../../contracts';
import {
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
  getFlattenedHeadersMap,
  getMultiValueHeadersMap,
  getPathWithQueryStringParams,
} from '../../core';

//#endregion

/**
 * The options to customize the {@link AlbAdapter}
 *
 * @breadcrumb Adapters / AWS / AlbAdapter
 * @public
 */
export interface AlbAdapterOptions {
  /**
   * Strip base path for custom domains
   *
   * @defaultValue ''
   */
  stripBasePath?: string;
}

/**
 * The adapter to handle requests from AWS ALB
 *
 * @example
 * ```typescript
 * const stripBasePath = '/any/custom/base/path'; // default ''
 * const adapter = new AlbAdapter({ stripBasePath });
 * ```
 *
 * {@link https://docs.aws.amazon.com/lambda/latest/dg/services-alb.html | Event Reference}
 *
 * @breadcrumb Adapters / AWS / AlbAdapter
 * @public
 */
export class AlbAdapter
  implements AdapterContract<ALBEvent, Context, ALBResult>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link AlbAdapter}
   */
  constructor(protected readonly options?: AlbAdapterOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return AlbAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown): event is ALBEvent {
    const albEvent = event as Partial<ALBEvent>;

    return !!(albEvent?.requestContext && albEvent.requestContext.elb);
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(event: ALBEvent): AdapterRequest {
    const method = event.httpMethod;
    const path = this.getPathFromEvent(event);

    const headers = event.multiValueHeaders
      ? getFlattenedHeadersMap(event.multiValueHeaders, ',', true)
      : event.headers!;

    let body: Buffer | undefined;

    if (event.body) {
      const [bufferBody, contentLength] = getEventBodyAsBuffer(
        event.body,
        event.isBase64Encoded,
      );

      body = bufferBody;
      headers['content-length'] = String(contentLength);
    }

    let remoteAddress = '';

    // ref: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/x-forwarded-headers.html#x-forwarded-for
    if (headers['x-forwarded-for']) remoteAddress = headers['x-forwarded-for'];

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
    event,
    headers: responseHeaders,
    body,
    isBase64Encoded,
    statusCode,
  }: GetResponseAdapterProps<ALBEvent>): ALBResult {
    const multiValueHeaders = !event.headers
      ? getMultiValueHeadersMap(responseHeaders)
      : undefined;

    const headers = event.headers
      ? getFlattenedHeadersMap(responseHeaders)
      : undefined;

    return {
      statusCode,
      body,
      headers,
      multiValueHeaders,
      isBase64Encoded,
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
  }: OnErrorProps<ALBEvent, ALBResult>): void {
    const body = respondWithErrors ? error.stack || '' : '';
    const errorResponse = this.getResponse({
      event,
      statusCode: 500,
      body,
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
   * @param event - The event sent by serverless
   */
  protected getPathFromEvent(event: ALBEvent): string {
    const stripBasePath = getDefaultIfUndefined(
      this.options?.stripBasePath,
      '',
    );
    const replaceRegex = new RegExp(`^${stripBasePath}`);
    const path = event.path.replace(replaceRegex, '');

    const queryParams = event.headers
      ? event.queryStringParameters
      : event.multiValueQueryStringParameters;

    return getPathWithQueryStringParams(path, queryParams || {});
  }

  //#endregion
}

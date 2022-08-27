//#region Imports

import { DigitalOceanHttpEvent } from '../../@types/digital-ocean';
import { DigitalOceanHttpResponse } from '../../@types/digital-ocean/digital-ocean-http-response';
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
  getPathWithQueryStringParams,
} from '../../core';

//#endregion

/**
 * The result of parser strategy
 *
 * @breadcrumb Adapters / Digital Ocean / HttpFunctionAdapter
 * @public
 */
export type ArgsParserResult = { path: string; body?: string };

/**
 * The interface that represents strategy to parse `event` and get the `path` and `body` to forward to framework.
 *
 * @breadcrumb Adapters / Digital Ocean / HttpFunctionAdapter
 * @public
 */
export interface ArgsParserStrategy {
  /**
   * The method to parse `event` and create path and get the body for the request.
   *
   * @param event - The event sent from DigitalOcean Functions
   */
  parse: (event: DigitalOceanHttpEvent) => ArgsParserResult;
}

/**
 * The default parser to get path and body.
 *
 * By default, if `__ow_body` is set, the params inside `event` will be forwarded to `queryParams`.
 * If we didn't find any params, we return `__ow_body`.
 * If `__ow_body` is not set, all params is forwarded inside `body`.
 *
 * @example
 * ```typescript
 * const strategy = new DefaultArgsParserStrategy();
 * const __ow_path = '/test';
 *
 * // url called: /test?page=1, with body being an image
 * console.log(strategy.parse({ __ow_path, __ow_body: 'base64', page: '1' }));
 * // { path: '/test?page=1', body: 'base64' }
 *
 * // url called: /test, with body being an image
 * console.log(strategy.parse({ __ow_path, __ow_body: 'base64' }));
 * // { path: '/test', body: 'base64' }
 *
 * // url called: /test?page=1
 * console.log(strategy.parse({ __ow_path, page: '1' }));
 * // { path: '/test', body: '{"page":"1"}' }
 *
 * // url called: /test, with body being { test: true }
 * console.log(strategy.parse({ __ow_path, test: true }));
 * // { path: '/test', body: '{"test":true}' }
 * ```
 *
 * @breadcrumb Adapters / Digital Ocean / HttpFunctionAdapter
 * @public
 */
export class DefaultArgsParserStrategy implements ArgsParserStrategy {
  /**
   * {@inheritDoc}
   */
  public parse(event: DigitalOceanHttpEvent): ArgsParserResult {
    const paramKeys = Object.keys(event).filter(key => !key.startsWith('__ow'));

    if (paramKeys.length === 0)
      return { path: event.__ow_path, body: event.__ow_body };

    const params: Record<string, any> = Object.entries(event)
      .filter(([key]) => !key.startsWith('__ow'))
      .reduce((acc, [key, value]) => {
        acc[key] = value;

        return acc;
      }, {});

    if (event.__ow_body) {
      const path = getPathWithQueryStringParams(event.__ow_path, params);

      return { path, body: event.__ow_body };
    }

    return {
      path: event.__ow_path,
      body: JSON.stringify(params),
    };
  }
}

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

  /**
   * Because DigitalOcean don't tell us if param inside args is query param or body param, we need to guess.
   * By default, we use {@link DefaultArgsParserStrategy} which prefers send params inside body instead query param.
   *
   * @defaultValue {@link DefaultArgsParserStrategy}
   */
  argsParserStrategy?: ArgsParserStrategy;
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
      digitalOceanHttpEvent.__ow_path !== undefined &&
      digitalOceanHttpEvent.__ow_method !== undefined &&
      digitalOceanHttpEvent.__ow_headers !== undefined
    );
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(event: DigitalOceanHttpEvent): AdapterRequest {
    if (!event.__ow_path) event.__ow_path = '/';

    event.__ow_path = this.getPathStrippedPath(event.__ow_path);

    const headers = event.__ow_headers;
    const method = event.__ow_method;
    const argsParserStrategy = getDefaultIfUndefined(
      this.options?.argsParserStrategy,
      new DefaultArgsParserStrategy(),
    );
    const { path, body: rawBody } = argsParserStrategy.parse(event);

    let body: Buffer | undefined;

    if (rawBody) {
      const [bufferBody, contentLength] = getEventBodyAsBuffer(
        rawBody,
        !!event.__ow_isBase64Encoded,
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
   * Get path from event
   *
   * @param path - The original path
   */
  protected getPathStrippedPath(path: string): string {
    const stripBasePath = getDefaultIfUndefined(
      this.options?.stripBasePath,
      '',
    );

    if (!stripBasePath) return path;

    const replaceRegex = new RegExp(`^${stripBasePath}`);

    return path.replace(replaceRegex, '');
  }

  //#endregion
}

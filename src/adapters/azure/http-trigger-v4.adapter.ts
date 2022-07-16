//#region Imports

import { URL } from 'url';
import type {
  Context,
  Cookie,
  HttpRequest,
  HttpResponseSimple,
} from '@azure/functions';
import { BothValueHeaders } from '../../@types';
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
 * The options to customize the {@link HttpTriggerV4Adapter}
 *
 * @breadcrumb Adapters / Azure / HttpTriggerV4Adapter
 * @public
 */
export interface HttpTriggerV4AdapterOptions {
  /**
   * Strip base path for custom domains
   *
   * @defaultValue ''
   */
  stripBasePath?: string;
}

/**
 * The adapter to handle requests from Http Trigger on Azure Function V4.
 *
 * @example
 * ```typescript
 * const stripBasePath = '/any/custom/base/path'; // default ''
 * const adapter = new HttpTriggerV4Adapter({ stripBasePath });
 * ```
 *
 * @see {@link https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node | Reference}
 *
 * @breadcrumb Adapters / Azure / HttpTriggerV4Adapter
 * @public
 */
export class HttpTriggerV4Adapter
  implements AdapterContract<HttpRequest, Context, HttpResponseSimple>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link HttpTriggerV4Adapter}
   */
  constructor(protected readonly options?: HttpTriggerV4AdapterOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return HttpTriggerV4Adapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown, context: unknown): boolean {
    const maybeEvent = event as Partial<HttpRequest> | undefined;
    const maybeContext = context as Partial<Context> | undefined;

    return !!(
      maybeEvent &&
      maybeEvent.method &&
      maybeEvent.headers &&
      maybeEvent.url &&
      maybeEvent.query &&
      maybeContext &&
      maybeContext.traceContext &&
      maybeContext.bindingDefinitions &&
      maybeContext.log &&
      maybeContext.log.info &&
      maybeContext.bindingData
    );
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(event: HttpRequest): AdapterRequest {
    const path = this.getPathFromEvent(event);

    const method = event.method;
    const headers = getFlattenedHeadersMap(event.headers, ',', true);

    let body: Buffer | undefined;

    if (event.body) {
      const [bufferBody, contentLength] = getEventBodyAsBuffer(
        event.rawBody,
        false,
      );

      body = bufferBody;
      headers['content-length'] = String(contentLength);
    }

    const remoteAddress = headers['x-forwarded-for'];

    return {
      method: method as string,
      path,
      headers,
      remoteAddress,
      body,
    };
  }

  /**
   * {@inheritDoc}
   */
  public getResponse({
    body,
    isBase64Encoded,
    statusCode,
    headers: originalHeaders,
  }: GetResponseAdapterProps<HttpRequest>): HttpResponseSimple {
    const headers = getFlattenedHeadersMap(originalHeaders, ',', true);
    const cookies = this.getAzureCookiesFromHeaders(originalHeaders);

    if (headers['set-cookie']) delete headers['set-cookie'];

    return {
      body,
      statusCode,
      headers,
      // I tried to understand this property with
      // https://docs.microsoft.com/en-us/aspnet/web-api/overview/formats-and-model-binding/content-negotiation
      // but I don't know if it's worth implementing this guy as an option
      // I found out when this guy is set to true and the framework sets content-type, azure returns 500
      // So I'll leave it as is and hope no one has any problems.
      enableContentNegotiation: false,
      cookies,
    };
  }

  /**
   * {@inheritDoc}
   */
  public onErrorWhileForwarding({
    error,
    respondWithErrors,
    event,
    delegatedResolver,
    log,
  }: OnErrorProps<HttpRequest, HttpResponseSimple>): void {
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
   * @param event - The event sent by serverless
   */
  protected getPathFromEvent(event: HttpRequest): string {
    const stripBasePath = getDefaultIfUndefined(
      this.options?.stripBasePath,
      '',
    );

    const url = new URL(event.url);
    const originalPath = url.pathname;

    const replaceRegex = new RegExp(`^${stripBasePath}`);
    const path = originalPath.replace(replaceRegex, '');

    const queryParams = event.query;

    return getPathWithQueryStringParams(path, queryParams);
  }

  /**
   * Get the Azure Cookie list parsed from set-cookie header.
   *
   * @param headers - The headers object
   */
  protected getAzureCookiesFromHeaders(headers: BothValueHeaders): Cookie[] {
    const setCookie = headers['set-cookie'];

    const headerCookies = Array.isArray(setCookie)
      ? setCookie
      : setCookie
      ? [setCookie]
      : [];

    return headerCookies.map(cookie => this.parseCookie(cookie));
  }

  /**
   * Parse the string cookie to the Azure Cookie Object.
   * This code was written by {@link https://github.com/zachabney | @zachabney}
   * on {@link https://github.com/zachabney/azure-aws-serverless-express/blob/241d2d5c4d5906e4817662cad6426ec2cbbf9ca7/src/index.js#L4-L49 | this library}.
   *
   * @param cookie - The cookie
   */
  protected parseCookie(cookie: string): Cookie {
    return cookie.split(';').reduce(
      (azureCookieObject, cookieProperty, index) => {
        const [key, value] = cookieProperty.split('=');

        const sanitizedKey = key.toLowerCase().trim();
        const sanitizedValue = value && value.trim();

        if (index === 0) {
          azureCookieObject.name = key;
          azureCookieObject.value = sanitizedValue;

          return azureCookieObject;
        }

        switch (sanitizedKey) {
          case 'domain':
            azureCookieObject.domain = sanitizedValue;
            break;
          case 'path':
            azureCookieObject.path = sanitizedValue;
            break;
          case 'expires':
            azureCookieObject.expires = new Date(sanitizedValue);
            break;
          case 'secure':
            azureCookieObject.secure = true;
            break;
          case 'httponly':
            azureCookieObject.httpOnly = true;
            break;
          case 'samesite':
            azureCookieObject.sameSite = sanitizedValue as Cookie['sameSite'];
            break;
          case 'max-age':
            azureCookieObject.maxAge = Number(sanitizedValue);
            break;
        }

        return azureCookieObject;
      },
      { name: '', value: '' } as Cookie,
    );
  }

  //#endregion
}

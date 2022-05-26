//#region Imports

import { HuaweiApiGatewayEvent, HuaweiContext } from '../../@types/huawei';
import { HuaweiApiGatewayResponse } from '../../@types/huawei/huawei-api-gateway-response';
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
 * The options to customize the {@link HuaweiApiGatewayAdapter}
 */
export interface HuaweiApiGatewayOptions {
  /**
   * Strip base path for custom domains
   *
   * @default ''
   */
  stripBasePath?: string;
}

/**
 * The adapter to handle requests from Huawei Api Gateway
 *
 * @example```typescript
 * const stripBasePath = '/any/custom/base/path'; // default ''
 * const adapter = new ApiGatewayAdapter({ stripBasePath });
 * ```
 *
 * {@link https://support.huaweicloud.com/intl/en-us/devg-functiongraph/functiongraph_02_0102.html#functiongraph_02_0102__li5178638110137 Event Reference}
 */
export class HuaweiApiGatewayAdapter
  implements
    AdapterContract<
      HuaweiApiGatewayEvent,
      HuaweiContext,
      HuaweiApiGatewayResponse
    >
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options The options to customize the {@link HuaweiApiGatewayAdapter}
   */
  constructor(protected readonly options?: HuaweiApiGatewayOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * @inheritDoc
   */
  public getAdapterName(): string {
    return HuaweiApiGatewayAdapter.name;
  }

  /**
   * @inheritDoc
   */
  public canHandle(event: unknown): event is HuaweiApiGatewayEvent {
    const apiGatewayEvent = event as Partial<HuaweiApiGatewayEvent>;

    return !!(
      apiGatewayEvent &&
      apiGatewayEvent.httpMethod &&
      apiGatewayEvent.requestContext &&
      apiGatewayEvent.requestContext.apiId &&
      apiGatewayEvent.requestContext.stage &&
      apiGatewayEvent.requestContext.requestId &&
      // to avoid conflict with api gateway v1 of aws
      !('multiValueQueryStringParameters' in apiGatewayEvent)
    );
  }

  /**
   * @inheritDoc
   */
  public getRequest(event: HuaweiApiGatewayEvent): AdapterRequest {
    const method = event.httpMethod;
    const path = this.getPathFromEvent(event);

    const headers = getFlattenedHeadersMap(event.headers, ',', true);

    let body: Buffer | undefined;

    if (event.body) {
      const [bufferBody, contentLength] = getEventBodyAsBuffer(
        event.body,
        event.isBase64Encoded,
      );

      body = bufferBody;
      headers['content-length'] = String(contentLength);
    }

    const remoteAddress = headers['x-real-ip'];

    return {
      method,
      headers,
      body,
      remoteAddress,
      path,
    };
  }

  /**
   * @inheritDoc
   */
  public getResponse({
    headers: responseHeaders,
    body,
    isBase64Encoded,
    statusCode,
  }: GetResponseAdapterProps<HuaweiApiGatewayEvent>): HuaweiApiGatewayResponse {
    const headers = getMultiValueHeadersMap(responseHeaders);

    return {
      statusCode,
      body,
      headers,
      isBase64Encoded,
    };
  }

  /**
   * @inheritDoc
   */
  public onErrorWhileForwarding({
    error,
    delegatedResolver,
    respondWithErrors,
    event,
    log,
  }: OnErrorProps<HuaweiApiGatewayEvent, HuaweiApiGatewayResponse>): void {
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
   * @param event The event sent by serverless
   */
  protected getPathFromEvent(event: HuaweiApiGatewayEvent): string {
    const stripBasePath = getDefaultIfUndefined(
      this.options?.stripBasePath,
      '',
    );
    const replaceRegex = new RegExp(`^${stripBasePath}`);
    const path = event.path.replace(replaceRegex, '');

    const queryParams = event.queryStringParameters;

    return getPathWithQueryStringParams(path, queryParams);
  }

  //#endregion
}

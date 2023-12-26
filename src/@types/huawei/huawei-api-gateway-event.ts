//#region Imports

import type { BothValueHeaders } from '../index';

//#endregion

/**
 * The interface that represents the Api Gateway Event of Huawei when integrate with Function Graph of Event Type.
 * See more in {@link https://support.huaweicloud.com/intl/en-us/devg-functiongraph/functiongraph_02_0102.html#functiongraph_02_0102__li5178638110137 | Reference}.
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiApiGatewayEvent
 */
export interface HuaweiApiGatewayEvent {
  /**
   * The body value with the content of this event serialized in JSON
   */
  body: string;

  /**
   * The headers of the request which this event represents
   */
  headers: BothValueHeaders;

  /**
   * The HTTP Method of the request which this event represents
   */
  httpMethod: string;

  /**
   * Tells if the body is base64 encoded
   */
  isBase64Encoded: boolean;

  /**
   * The path of the request which this event represents
   */
  path: string;

  /**
   * The path parameters of the request which this event represents
   */
  pathParameters: HuaweiRequestPathParameters;

  /**
   * The query strings of the request which this event represents
   */
  queryStringParameters: HuaweiRequestQueryStringParameters;

  /**
   * The request context with information about the stage, api and requestId
   */
  requestContext: HuaweiRequestContext;

  /**
   * It can have more properties that I could not discover yet
   */
  [key: string]: any;
}

/**
 * The path parameters of the request, usually is the name of the wildcard you create in FunctionGraph, such as /\{proxy\}.
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiApiGatewayEvent
 */
export type HuaweiRequestPathParameters = Record<string, string>;

/**
 * The query strings of the request
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiApiGatewayEvent
 */
export type HuaweiRequestQueryStringParameters = Record<
  string,
  string | string[]
>;

/**
 * The interface that represents the values you can get inside request context.
 *
 * @public
 * @breadcrumb Types / Huawei / HuaweiApiGatewayEvent
 */
export interface HuaweiRequestContext {
  /**
   * The ID of your API inside Api Gateway
   */
  apiId: string;

  /**
   * The ID of this request
   */
  requestId: string;

  /**
   * The name of the stage running this Function Graph
   */
  stage: string;
}

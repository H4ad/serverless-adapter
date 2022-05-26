import { BothValueHeaders } from '../index';

export interface HuaweiApiGatewayEvent {
  body: string;
  headers: BothValueHeaders;
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: HuaweiRequestPathParameters;
  queryStringParameters: HuaweiRequestQueryStringParameters;
  requestContext: HuaweiRequestContext;

  [key: string]: any;
}

export type HuaweiRequestPathParameters = Record<string, string>;

export type HuaweiRequestQueryStringParameters = Record<
  string,
  string | string[]
>;

export interface HuaweiRequestContext {
  apiId: string;
  requestId: string;
  stage: string;
}

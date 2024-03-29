import { getMultiValueHeadersMap } from '@h4ad/serverless-adapter';
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda/trigger/api-gateway-proxy';

export function createApiGatewayV1(
  httpMethod: string,
  path: string,
  body?: Record<string, unknown>,
  headers?: Record<string, string>,
  queryParams?: APIGatewayProxyEventQueryStringParameters,
): APIGatewayProxyEvent {
  return {
    resource: '/{proxy+}',
    path,
    httpMethod,
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'CloudFront-Forwarded-Proto': 'https',
      'CloudFront-Is-Desktop-Viewer': 'true',
      'CloudFront-Is-Mobile-Viewer': 'false',
      'CloudFront-Is-SmartTV-Viewer': 'false',
      'CloudFront-Is-Tablet-Viewer': 'false',
      'CloudFront-Viewer-Country': 'US',
      'content-type': '',
      Host: 'xxxxxx.execute-api.us-east-1.amazonaws.com',
      origin: 'https://xxxxxx.execute-api.us-east-1.amazonaws.com',
      pragma: 'no-cache',
      Referer: 'https://xxxxxx.execute-api.us-east-1.amazonaws.com/prod/',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
      Via: '2.0 00f0a41f749793b9dd653153037c957e.cloudfront.net (CloudFront)',
      'X-Amz-Cf-Id': '2D5N65SYHJdnJfEmAV_hC0Mw3QvkbUXDumJKAL786IGHRdq_MggPtA==',
      'X-Amzn-Trace-Id': 'Root=1-5cdf30d0-31a428004abe13807f9445b0',
      'X-Forwarded-For': '11.111.111.111, 11.111.111.111',
      'X-Forwarded-Port': '443',
      'X-Forwarded-Proto': 'https',
      ...headers,
    },
    multiValueHeaders: {
      Accept: ['*/*'],
      'Accept-Encoding': ['gzip, deflate, br'],
      'Accept-Language': ['en-US,en;q=0.9'],
      'cache-control': ['no-cache'],
      'CloudFront-Forwarded-Proto': ['https'],
      'CloudFront-Is-Desktop-Viewer': ['true'],
      'CloudFront-Is-Mobile-Viewer': ['false'],
      'CloudFront-Is-SmartTV-Viewer': ['false'],
      'CloudFront-Is-Tablet-Viewer': ['false'],
      'CloudFront-Viewer-Country': ['US'],
      'content-type': [],
      Host: ['xxxxxx.execute-api.us-east-1.amazonaws.com'],
      origin: ['https://xxxxxx.execute-api.us-east-1.amazonaws.com'],
      pragma: ['no-cache'],
      Referer: ['https://xxxxxx.execute-api.us-east-1.amazonaws.com/prod/'],
      'User-Agent': [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
      ],
      Via: ['2.0 00f0a41f749793b9dd653153037c957e.cloudfront.net (CloudFront)'],
      'X-Amz-Cf-Id': [
        '2D5N65SYHJdnJfEmAV_hC0Mw3QvkbUXDumJKAL786IGHRdq_MggPtA==',
      ],
      'X-Amzn-Trace-Id': ['Root=1-5cdf30d0-31a428004abe13807f9445b0'],
      'X-Forwarded-For': ['11.111.111.111, 11.111.111.111'],
      'X-Forwarded-Port': ['443'],
      'X-Forwarded-Proto': ['https'],
      ...(headers && getMultiValueHeadersMap(headers)),
    },
    queryStringParameters: queryParams || null,
    multiValueQueryStringParameters:
      (queryParams && getMultiValueHeadersMap(queryParams)) || null,
    pathParameters: {
      path: path.replace(/^\//, ''),
    },
    stageVariables: {},
    requestContext: {
      authorizer: {
        claims: null,
        scopes: null,
      },
      resourceId: 'xxxxx',
      resourcePath: '/{proxy+}',
      httpMethod: 'POST',
      extendedRequestId: 'Z2SQlEORIAMFjpA=',
      requestTime: '17/May/2019:22:08:16 +0000',
      path,
      accountId: 'xxxxxxxx',
      protocol: 'HTTP/1.1',
      stage: 'prod',
      domainPrefix: 'xxxxxx',
      requestTimeEpoch: 1558130896565,
      requestId: '4589cf16-78f0-11e9-9c65-816a9b037cec',
      identity: {
        apiKey: null,
        apiKeyId: null,
        clientCert: null,
        cognitoIdentityPoolId: null,
        accountId: null,
        cognitoIdentityId: null,
        caller: null,
        sourceIp: '11.111.111.111',
        principalOrgId: null,
        accessKey: null,
        cognitoAuthenticationType: null,
        cognitoAuthenticationProvider: null,
        userArn: null,
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        user: null,
      },
      domainName: 'xxxxxx.execute-api.us-east-1.amazonaws.com',
      apiId: 'xxxxxx',
    },
    body: (body && JSON.stringify(body)) || null,
    isBase64Encoded: false,
  };
}

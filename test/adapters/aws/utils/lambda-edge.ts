import type { CloudFrontHeaders } from 'aws-lambda/common/cloudfront';
import type { CloudFrontRequestEvent } from 'aws-lambda/trigger/cloudfront-request';

export function createLambdaEdgeViewerEvent(
  httpMethod: string,
  path: string,
  body?: Record<string, unknown>,
  headers?: CloudFrontHeaders,
  queryParams?: string,
): CloudFrontRequestEvent {
  return {
    Records: [
      {
        cf: {
          config: {
            distributionDomainName: 'd3qj9vk9486y6c.cloudfront.net',
            distributionId: 'E2I5C7O4FEQEKZ',
            eventType: 'viewer-request',
            requestId:
              'BKXC0kFgBfWSEgribSo9EwziZB1FztiXQ96VRvTfFNHYCBv7Ko-RBQ==',
          },
          request: {
            clientIp: '203.123.103.37',
            headers: headers ?? {
              host: [
                {
                  key: 'Host',
                  value: 'd3qj9vk9486y6c.cloudfront.net',
                },
              ],
              'user-agent': [
                {
                  key: 'User-Agent',
                  value:
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
                },
              ],
              'cache-control': [
                {
                  key: 'Cache-Control',
                  value: 'max-age=0',
                },
              ],
              accept: [
                {
                  key: 'accept',
                  value:
                    'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                },
              ],
              'if-none-match': [
                {
                  key: 'if-none-match',
                  value: 'W/"2e-Lu6qxFOQSPFulDAGUFiiK6QgREo"',
                },
              ],
              'accept-language': [
                {
                  key: 'accept-language',
                  value: 'en-US,en;q=0.9',
                },
              ],
              'upgrade-insecure-requests': [
                {
                  key: 'upgrade-insecure-requests',
                  value: '1',
                },
              ],
              origin: [
                {
                  key: 'Origin',
                  value: 'https://d3qj9vk9486y6c.cloudfront.net',
                },
              ],
              'sec-fetch-site': [
                {
                  key: 'Sec-Fetch-Site',
                  value: 'same-origin',
                },
              ],
              'sec-fetch-mode': [
                {
                  key: 'Sec-Fetch-Mode',
                  value: 'cors',
                },
              ],
              'sec-fetch-dest': [
                {
                  key: 'Sec-Fetch-Dest',
                  value: 'empty',
                },
              ],
              referer: [
                {
                  key: 'Referer',
                  value: 'https://d3qj9vk9486y6c.cloudfront.net/users',
                },
              ],
              'accept-encoding': [
                {
                  key: 'Accept-Encoding',
                  value: 'gzip, deflate, br',
                },
              ],
            },
            body: body
              ? {
                  action: 'read-only',
                  encoding: 'base64',
                  inputTruncated: false,
                  data: Buffer.from(JSON.stringify(body), 'utf-8').toString(
                    'base64',
                  ),
                }
              : undefined,
            method: httpMethod,
            querystring: queryParams || '',
            uri: path,
          },
        },
      },
    ],
  };
}

export function createLambdaEdgeOriginEvent(
  httpMethod: string,
  path: string,
  body?: Record<string, unknown>,
  headers?: CloudFrontHeaders,
  queryParams?: string,
): CloudFrontRequestEvent {
  return {
    Records: [
      {
        cf: {
          config: {
            distributionDomainName: 'd111111abcdef8.cloudfront.net',
            distributionId: 'EDFDVBD6EXAMPLE',
            eventType: 'origin-request',
            requestId:
              '4TyzHTaYWb1GX1qTfsHhEqV6HUDd_BzoBZnwfnvQc_1oF26ClkoUSEQ==',
          },
          request: {
            body: body
              ? {
                  action: 'read-only',
                  encoding: 'base64',
                  inputTruncated: false,
                  data: Buffer.from(JSON.stringify(body), 'utf-8').toString(
                    'base64',
                  ),
                }
              : undefined,
            clientIp: '203.0.113.178',
            headers: headers ?? {
              'x-forwarded-for': [
                {
                  key: 'X-Forwarded-For',
                  value: '203.0.113.178',
                },
              ],
              'user-agent': [
                {
                  key: 'User-Agent',
                  value: 'Amazon CloudFront',
                },
              ],
              via: [
                {
                  key: 'Via',
                  value:
                    '2.0 2afae0d44e2540f472c0635ab62c232b.cloudfront.net (CloudFront)',
                },
              ],
              host: [
                {
                  key: 'Host',
                  value: 'example.org',
                },
              ],
              'cache-control': [
                {
                  key: 'Cache-Control',
                  value: 'no-cache, cf-no-cache',
                },
              ],
            },
            method: httpMethod,
            origin: {
              custom: {
                customHeaders: {},
                domainName: 'example.org',
                keepaliveTimeout: 5,
                path: '',
                port: 443,
                protocol: 'https',
                readTimeout: 30,
                sslProtocols: ['TLSv1', 'TLSv1.1', 'TLSv1.2'],
              },
            },
            querystring: queryParams || '',
            uri: path,
          },
        },
      },
    ],
  };
}

import { BothValueHeaders } from '../../../../src';
import {
  HuaweiApiGatewayEvent,
  HuaweiRequestQueryStringParameters,
} from '../../../../src/@types/huawei';

export function createHuaweiApiGateway(
  method: string,
  path: string,
  body?: object,
  headers?: BothValueHeaders,
  queryParams?: HuaweiRequestQueryStringParameters,
): HuaweiApiGatewayEvent {
  const bodyBuffer = Buffer.from(JSON.stringify(body || ''), 'utf-8');

  return {
    body: body ? bodyBuffer.toString('base64') : '',
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,bg;q=0.6',
      'cache-control': 'max-age=0',
      'content-length': Buffer.byteLength(bodyBuffer).toString(),
      connection: 'keep-alive',
      dnt: '1',
      host: 'test.apig.la-south-2.huaweicloudapis.com',
      'sec-ch-ua':
        '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36',
      'x-forwarded-for': '33.33.33.33',
      'x-forwarded-host': 'test.apig.la-south-2.huaweicloudapis.com',
      'x-forwarded-port': '443',
      'x-forwarded-proto': 'https',
      'x-real-ip': '33.33.33.33',
      'x-request-id': 'eb6f50b5922fd574175f8115ba22c168',
      ...headers,
    },
    httpMethod: method,
    isBase64Encoded: true,
    'lubanops-gtrace-id': '',
    'lubanops-ndomain-id': '',
    'lubanops-nenv-id': '',
    'lubanops-nspan-id': '',
    'lubanops-ntrace-id': '',
    'lubanops-sevent-id': '',
    path,
    pathParameters: {},
    queryStringParameters: {
      ...queryParams,
    },
    requestContext: {
      apiId: '863aad9dd5dd4043b7f6745b34922323',
      requestId: 'eb6f50b5922fd574175f8115ba943222',
      stage: 'RELEASE',
    },
  };
}

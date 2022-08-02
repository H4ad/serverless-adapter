import { URL } from 'url';
import type { Context, Form, HttpRequest } from '@azure/functions';
import { BothValueHeaders } from '../../../../src';

export function createHttpTriggerEvent(
  method: HttpRequest['method'],
  path: string,
  body?: Record<string, unknown>,
  headers?: BothValueHeaders,
): HttpRequest {
  const url = new URL(`http://localhost${path}`);

  url.searchParams.set('code', 'sE_d8h7XJ4YYsGJ7mgVta_t-32323%3D%3D');

  return {
    method,
    url: `https://serverless-adapter.azurewebsites.net/api/test-serverless-adapter${
      path || ''
    }?${url.searchParams.toString()}`,
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,bg;q=0.6',
      'cache-control': 'max-age=0',
      host: 'serverless-adapter.azurewebsites.net',
      'max-forwards': '9',
      'user-agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      'sec-ch-ua':
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      dnt: '1',
      'sec-fetch-site': 'none',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-user': '?1',
      'sec-fetch-dest': 'document',
      'x-arr-log-id': '09a0a10e-eaba-487f-9e6b-ae6ce6f1d333',
      'client-ip': '2.3.3.3:30750',
      'x-site-deployment-id': 'serverless-adapter',
      'was-default-hostname': 'serverless-adapter.azurewebsites.net',
      'x-forwarded-proto': 'https',
      'x-appservice-proto': 'https',
      'x-arr-ssl':
        '2048|256|CN=Microsoft Azure TLS Issuing CA 01, O=Microsoft Corporation, C=US|CN=*.azurewebsites.net, O=Microsoft Corporation, L=Redmond, S=WA, C=US',
      'x-forwarded-tlsversion': '1.2',
      'x-forwarded-for': '3.3.3.3:49196',
      'x-original-url':
        '/api/test-serverless-adapter?code=sE_d8h7XJ4YYsGJ7mgVta_t-32323%3D%3D',
      'x-waws-unencoded-url':
        '/api/test-serverless-adapter?code=sE_d8h7XJ4YYsGJ7mgVta_t-32323%3D%3D',
      'disguised-host': 'serverless-adapter.azurewebsites.net',
      ...headers,
    },
    query: Object.fromEntries(url.searchParams.entries()),
    params: {},
    body: body || undefined,
    rawBody: body ? JSON.stringify(body) : undefined,
    user: null,
    parseFormBody(): Form {
      throw new Error('test');
    },
  };
}

export function createHttpTriggerContext(
  method: HttpRequest['method'],
  path: string,
  body?: Record<string, unknown>,
  headers?: BothValueHeaders,
): Context {
  const req = createHttpTriggerEvent(method, path, body, headers);

  const log = jest.fn();

  Object.assign(log, {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    verbose: jest.fn(),
  });

  return {
    invocationId: '6947db6b-98f6-406b-a1ce-e5bd7244ff66',
    traceContext: {
      traceparent: '00-7d1ba80dfba92a27453561f5844346c9-684d236d619d3234-00',
      tracestate: '',
      attributes: {},
    },
    executionContext: {
      invocationId: '6947db6b-98f6-406b-a1ce-e5bd7244ff66',
      functionName: 'test-serverless-adapter',
      functionDirectory: 'C:\\home\\site\\wwwroot\\test-serverless-adapter',
      retryContext: null,
    },
    bindings: {
      req,
    },
    log: log as unknown as Context['log'],
    bindingData: {
      invocationId: '6947db6b-98f6-406b-a1ce-32323',
      query: req.query,
      headers: req.headers,
      sys: {
        methodName: 'test-serverless-adapter',
        utcNow: '2022-07-10T20:48:24.113Z',
        randGuid: '5a5a0bfd-9774-4e5a-875d-bb8444d595b3',
      },
    },
    bindingDefinitions: [
      { name: 'req', type: 'httpTrigger', direction: 'in' },
      { name: 'res', type: 'http', direction: 'out' },
    ],
    done: jest.fn(),
    req: req,
    res: {
      headers: {},
      cookies: [],
      send: jest.fn(),
      header: jest.fn(),
      set: jest.fn(),
      get: jest.fn(),
      _done: jest.fn(),
    },
  };
}

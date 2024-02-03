import { DigitalOceanHttpEvent } from '../../../../src/@types/digital-ocean';

export function createHttpFunctionEvent(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  headers?: Record<string, string>,
  queryParams?: Record<string, string>,
): DigitalOceanHttpEvent {
  return {
    http: {
      method: method,
      queryString: new URLSearchParams(queryParams).toString(),
      body: JSON.stringify(body),
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip',
        'cdn-loop': 'cloudflare',
        'cf-connecting-ip': '45.444.444.444',
        'cf-ipcountry': 'BR',
        'cf-ray': '4444443444a537-GRU',
        'cf-visitor': '{"scheme":"https"}',
        'content-type': 'application/json',
        host: 'ccontroller',
        'user-agent': 'insomnia/2022.4.2',
        'x-custom': 'potato',
        'x-forwarded-for': '45.444.444.444',
        'x-forwarded-proto': 'https',
        'x-request-id': 'xxxxxxxxxxxxxxxxxx',
        ...headers,
      },
      path: path,
      isBase64Encoded: false,
    },
  };
}

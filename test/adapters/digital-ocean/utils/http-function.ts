import { type DigitalOceanHttpEvent } from '../../../../src/@types/digital-ocean';

export function createHttpFunctionEvent(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  headers?: Record<string, string>,
  queryParams?: Record<string, string>,
): DigitalOceanHttpEvent {
  return {
    __ow_method: method,
    __ow_query: new URLSearchParams(queryParams).toString(),
    __ow_body: JSON.stringify(body),
    __ow_headers: {
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
    __ow_path: path,
    __ow_isBase64Encoded: false,
  };
}

import { HttpFunctionAdapter } from '../../../../src/adapters/digital-ocean';
import { createHttpFunctionEvent } from './http-function';

export const allDigitalOceanEvents: Array<[string, any]> = [
  [
    HttpFunctionAdapter.name,
    createHttpFunctionEvent('post', '/users', { name: 'test' }),
  ],
  [HttpFunctionAdapter.name, createHttpFunctionEvent('get', '/potatos')],
  [HttpFunctionAdapter.name, createHttpFunctionEvent('get', '')],
  [
    HttpFunctionAdapter.name,
    createHttpFunctionEvent('get', '/query', undefined, undefined, {
      page: '1',
    }),
  ],
];

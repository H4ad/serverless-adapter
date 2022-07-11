import { HttpTriggerV4Adapter } from '../../../../src/adapters/azure';
import { createHttpTriggerEvent } from './http-trigger';

export const allAzureEvents: Array<[string, any]> = [
  [HttpTriggerV4Adapter.name, createHttpTriggerEvent('GET', '/')],
  [
    HttpTriggerV4Adapter.name,
    createHttpTriggerEvent('POST', '/', { name: 'Joga10' }),
  ],
];

import {
  AlbAdapter,
  ApiGatewayV1Adapter,
} from '../../../../src/v2/adapters/aws';
import {
  createAlbEvent,
  createAlbEventWithMultiValueHeaders,
} from './alb-event';
import { createApiGatewayV1 } from './api-gateway-v1';

export const allAWSEvents: Array<[string, any]> = [
  ['fake-to-test-undefined-event', undefined],
  [
    AlbAdapter.name,
    createAlbEvent('POST', '/users', { name: 'potato with banana' }),
  ],
  [
    AlbAdapter.name,
    createAlbEventWithMultiValueHeaders('PUT', '/users', { name: 'batata' }),
  ],
  [
    ApiGatewayV1Adapter.name,
    createApiGatewayV1('POST', '/users', { name: '' }),
  ],
];

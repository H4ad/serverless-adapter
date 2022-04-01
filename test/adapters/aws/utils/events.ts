import {
  AlbAdapter,
  ApiGatewayV1Adapter,
  ApiGatewayV2Adapter,
  DynamoDBAdapter,
  EventBridgeAdapter,
  LambdaEdgeAdapter,
  SNSAdapter,
  SQSAdapter,
} from '../../../../src/adapters/aws';
import {
  createAlbEvent,
  createAlbEventWithMultiValueHeaders,
} from './alb-event';
import { createApiGatewayV1 } from './api-gateway-v1';
import { createApiGatewayV2 } from './api-gateway-v2';
import { createDynamoDBEvent } from './dynamodb';
import {
  createEventBridgeEvent,
  createEventBridgeEventSimple,
} from './event-bridge';
import { createSQSEvent } from './sqs';
import { createSNSEvent } from './sns';
import {
  createLambdaEdgeOriginEvent,
  createLambdaEdgeViewerEvent,
} from './lambda-edge';

export const allAWSEvents: Array<[string, any]> = [
  ['fake-to-test-undefined-event', undefined],
  ['fake-to-test-records-empty-event', { Records: [] }],
  [
    AlbAdapter.name,
    createAlbEvent('POST', '/users', { name: 'potato with banana' }),
  ],
  [
    AlbAdapter.name,
    createAlbEventWithMultiValueHeaders('PUT', '/users', { name: 'batata' }),
  ],
  [AlbAdapter.name, createAlbEvent('GET', '/users')],
  [AlbAdapter.name, createAlbEventWithMultiValueHeaders('GET', '/users')],
  [
    ApiGatewayV1Adapter.name,
    createApiGatewayV1('POST', '/users', { name: 'Fake' }),
  ],
  [
    ApiGatewayV1Adapter.name,
    createApiGatewayV1('PUT', '/users', { name: 'Fake v2' }),
  ],
  [
    ApiGatewayV1Adapter.name,
    createApiGatewayV1('GET', '/users', undefined, {}, { page: '2' }),
  ],
  [ApiGatewayV2Adapter.name, createApiGatewayV2('GET', '/collaborators')],
  [
    ApiGatewayV2Adapter.name,
    createApiGatewayV2('POST', '/collaborators', { name: 'Fake' }),
  ],
  [
    ApiGatewayV2Adapter.name,
    createApiGatewayV2('PUT', '/collaborators', { name: 'Fake v2' }),
  ],
  [
    ApiGatewayV2Adapter.name,
    createApiGatewayV2('GET', '/collaborators', undefined, {}, { page: '2' }),
  ],
  [ApiGatewayV2Adapter.name, createApiGatewayV2('collaborators', '/users')],
  [DynamoDBAdapter.name, createDynamoDBEvent()],
  [EventBridgeAdapter.name, createEventBridgeEvent()],
  [EventBridgeAdapter.name, createEventBridgeEventSimple()],
  [SQSAdapter.name, createSQSEvent()],
  [SNSAdapter.name, createSNSEvent()],
  [LambdaEdgeAdapter.name, createLambdaEdgeViewerEvent('GET', '/image.png')],
  [
    LambdaEdgeAdapter.name,
    createLambdaEdgeViewerEvent('POST', '/image.png', {
      base64: Buffer.from('batata', 'utf-8').toString('base64'),
    }),
  ],
  [LambdaEdgeAdapter.name, createLambdaEdgeOriginEvent('GET', '/image.png')],
  [
    LambdaEdgeAdapter.name,
    createLambdaEdgeOriginEvent('POST', '/image.png', {
      base64: Buffer.from('batata', 'utf-8').toString('base64'),
    }),
  ],
];

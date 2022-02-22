import { makeAlbEvent, makeAlbResponse } from './alb-event';
import {
  makeApiGatewayV1Event,
  makeApiGatewayV1Response,
} from './api-gateway-v1-event';
import {
  makeApiGatewayV2Event,
  makeApiGatewayV2Response,
} from './api-gateway-v2-event';
const {
  makeLambdaEdgeEvent,
  makeLambdaEdgeResponse,
} = require('./lambda-edge-event.ts');

export const EVENT_SOURCE_NAMES = [
  'alb',
  'apiGatewayV1',
  'apiGatewayV2',
  'lambdaEdge',
];

export const FRAMEWORK_NAMES = [
  'express',
  // 'koa'
];
export const EACH_MATRIX: any[] = [];

EVENT_SOURCE_NAMES.forEach(eventSource => {
  FRAMEWORK_NAMES.forEach(framework => {
    EACH_MATRIX.push([eventSource, framework]);
  });
});

export const log = {
  info: () => null,
  debug: () => null,
  error: () => null,
};

export class MockContext {
  constructor(resolve, reject) {
    this.resolve = resolve;
    this.reject = reject;
  }

  resolve: any;
  reject: any;

  succeed(successResponse) {
    this.resolve(successResponse);
  }

  fail(error) {
    this.reject(error);
  }
}

export function makeEvent({ eventSourceName, ...rest }) {
  switch (eventSourceName) {
    case 'alb':
      return makeAlbEvent(rest);
    case 'apiGatewayV1':
      return makeApiGatewayV1Event(rest);
    case 'apiGatewayV2':
      return makeApiGatewayV2Event(rest);
    case 'lambdaEdge':
      return makeLambdaEdgeEvent(rest);
    default:
      throw new Error(`Unknown eventSourceName ${eventSourceName}`);
  }
}

export function makeResponse(
  { eventSourceName, ...rest }: any,
  { shouldConvertContentLengthToInt = false }: any = {},
): any {
  switch (eventSourceName) {
    case 'alb':
      return makeAlbResponse(rest);
    case 'apiGatewayV1':
      return makeApiGatewayV1Response(rest);
    case 'apiGatewayV2':
      return makeApiGatewayV2Response(rest, {
        shouldConvertContentLengthToInt,
      });
    case 'lambdaEdge':
      return makeLambdaEdgeResponse(rest);
    default:
      throw new Error(`Unknown eventSourceName ${eventSourceName}`);
  }
}

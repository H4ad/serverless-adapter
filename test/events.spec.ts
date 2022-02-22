import {
  dynamoDbEvent,
  samHttpApiEvent,
  snsEvent,
  sqsEvent,
} from './jest-helpers/events';
const {
  getEventSourceNameBasedOnEvent,
} = require('../src/event-sources/utils');

describe('getEventSourceNameBasedOnEvent', () => {
  test('throws error on empty event', () => {
    expect(() => getEventSourceNameBasedOnEvent({ event: {} })).toThrow(
      'Unable to determine event source based on event.',
    );
  });

  test('recognizes sam local HttpApi event', () => {
    const result = getEventSourceNameBasedOnEvent({ event: samHttpApiEvent });
    expect(result).toEqual('AWS_API_GATEWAY_V2');
  });

  test('recognizes dynamodb event', () => {
    const result = getEventSourceNameBasedOnEvent({ event: dynamoDbEvent });
    expect(result).toEqual('AWS_DYNAMODB');
  });

  test('recognizes sns event', () => {
    const result = getEventSourceNameBasedOnEvent({ event: snsEvent });
    expect(result).toEqual('AWS_SNS');
  });

  test('recognizes sqs event', () => {
    const result = getEventSourceNameBasedOnEvent({ event: sqsEvent });
    expect(result).toEqual('AWS_SQS');
  });
});

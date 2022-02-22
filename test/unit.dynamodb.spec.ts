import { dynamoDbEvent } from './jest-helpers/events';
const { getEventSource } = require('../src/event-sources');

const dynamodbEventSource = getEventSource({
  eventSourceName: 'AWS_DYNAMODB',
});

test('request is correct', () => {
  const req = getReq();
  expect(typeof req).toEqual('object');
  expect(req.headers).toEqual({ host: 'dynamodb.amazonaws.com' });
  expect(req.body).toEqual(dynamoDbEvent);
  expect(req.method).toEqual('POST');
});

function getReq() {
  const event = dynamoDbEvent;
  const request = dynamodbEventSource.getRequest({ event });
  return request;
}

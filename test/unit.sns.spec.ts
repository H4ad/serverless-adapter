import { snsEvent } from './jest-helpers/events';

const { getEventSource } = require('../src/event-sources');

const snsEventSource = getEventSource({
  eventSourceName: 'AWS_SNS',
});

test('request is correct', () => {
  const req = getReq();
  expect(typeof req).toEqual('object');
  expect(req.headers).toEqual({ host: 'sns.amazonaws.com' });
  expect(req.body).toEqual(snsEvent);
  expect(req.method).toEqual('POST');
});

function getReq() {
  const event = snsEvent;
  const request = snsEventSource.getRequest({ event });
  return request;
}

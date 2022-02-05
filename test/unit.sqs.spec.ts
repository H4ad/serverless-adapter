import { getEventSource } from '../src/event-sources';
import { sqsEvent } from './jest-helpers/events';

const sqsEventSource = getEventSource({
  eventSourceName: 'AWS_SQS',
});

test('request is correct', () => {
  const req = getReq();
  expect(typeof req).toEqual('object');
  expect(req.headers).toEqual({ host: 'sqs.amazonaws.com' });
  expect(req.body).toEqual(sqsEvent);
  expect(req.method).toEqual('POST');
});

function getReq() {
  const event = sqsEvent;
  const request = sqsEventSource.getRequest({ event });
  return request;
}

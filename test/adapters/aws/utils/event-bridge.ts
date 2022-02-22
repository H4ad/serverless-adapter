import type { EventBridgeEvent } from 'aws-lambda';

/**
 * Sample event from {@link https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html}
 */
export function createEventBridgeEvent(): EventBridgeEvent<any, any> {
  return {
    version: '0',
    id: 'fe8d3c65-xmpl-c5c3-2c87-81584709a377',
    'detail-type': 'RDS DB Instance Event',
    source: 'aws.rds',
    account: '123456789012',
    time: '2020-04-28T07:20:20Z',
    region: 'us-east-2',
    resources: ['arn:aws:rds:us-east-2:123456789012:db:rdz6xmpliljlb1'],
    detail: {
      EventCategories: ['backup'],
      SourceType: 'DB_INSTANCE',
      SourceArn: 'arn:aws:rds:us-east-2:123456789012:db:rdz6xmpliljlb1',
      Date: '2020-04-28T07:20:20.112Z',
      Message: 'Finished DB Instance backup',
      SourceIdentifier: 'rdz6xmpliljlb1',
    },
  };
}

/**
 * Sample event from {@link https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html}
 */
export function createEventBridgeEventSimple(): EventBridgeEvent<any, any> {
  return {
    version: '0',
    account: '123456789012',
    region: 'us-east-2',
    detail: {},
    'detail-type': 'Scheduled Event',
    source: 'aws.events',
    time: '2019-03-01T01:23:45Z',
    id: 'cdc73f9d-aea9-11e3-9d5a-835b769c0d9c',
    resources: ['arn:aws:events:us-east-2:123456789012:rule/my-schedule'],
  };
}

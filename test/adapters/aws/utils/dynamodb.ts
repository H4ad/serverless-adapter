import type { DynamoDBStreamEvent } from 'aws-lambda';

/**
 * Sample event from {@link https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html}
 */
export function createDynamoDBEvent(): DynamoDBStreamEvent {
  return {
    Records: [
      {
        eventID: '1',
        eventVersion: '1.0',
        dynamodb: {
          Keys: {
            Id: {
              N: '101',
            },
          },
          NewImage: {
            Message: {
              S: 'New item!',
            },
            Id: {
              N: '101',
            },
          },
          StreamViewType: 'NEW_AND_OLD_IMAGES',
          SequenceNumber: '111',
          SizeBytes: 26,
        },
        awsRegion: 'us-west-2',
        eventName: 'INSERT',
        eventSourceARN: 'arn:aws:dynamodb:us-east-1:0000000000:mytable',
        eventSource: 'aws:dynamodb',
      },
      {
        eventID: '2',
        eventVersion: '1.0',
        dynamodb: {
          OldImage: {
            Message: {
              S: 'New item!',
            },
            Id: {
              N: '101',
            },
          },
          SequenceNumber: '222',
          Keys: {
            Id: {
              N: '101',
            },
          },
          SizeBytes: 59,
          NewImage: {
            Message: {
              S: 'This item has changed',
            },
            Id: {
              N: '101',
            },
          },
          StreamViewType: 'NEW_AND_OLD_IMAGES',
        },
        awsRegion: 'us-west-2',
        eventName: 'MODIFY',
        eventSourceARN: 'arn:aws:dynamodb:us-east-1:0000000000:mytable',
        eventSource: 'aws:dynamodb',
      },
    ],
  };
}

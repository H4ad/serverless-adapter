import { DynamoDBStreamEvent } from 'aws-lambda';
import { DynamoDBAdapter } from '../../../src/v2/adapters/aws';
import { Resolver } from '../../../src/v2/contracts';
import {
  EmptyResponse,
  getEventBodyAsBuffer,
  IEmptyResponse,
  ILogger,
} from '../../../src/v2/core';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import { createDynamoDBEvent } from './utils/dynamodb';

describe(DynamoDBAdapter.name, () => {
  let adapter!: DynamoDBAdapter;

  beforeEach(() => {
    adapter = new DynamoDBAdapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(DynamoDBAdapter.name);
    });
  });

  createCanHandleTestsForAdapter(() => new DynamoDBAdapter(), undefined);

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const event = createDynamoDBEvent();

      const result = adapter.getRequest(event);

      expect(result.method).toBe('POST');
      expect(result.path).toBe('/dynamo');
      expect(result.headers).toHaveProperty('host', 'dynamodb.amazonaws.com');
      expect(result.headers).toHaveProperty('content-type', 'application/json');

      const [bodyBuffer, contentLength] = getEventBodyAsBuffer(
        JSON.stringify(event),
        false
      );

      expect(result.body).toBeInstanceOf(Buffer);
      expect(result.body).toStrictEqual(bodyBuffer);

      expect(result.headers).toHaveProperty(
        'content-length',
        String(contentLength)
      );
    });

    it('should return the correct mapping for the request with custom path and method', () => {
      const event = createDynamoDBEvent();

      const method = 'PUT';
      const path = '/custom/dynamo';

      const customAdapter = new DynamoDBAdapter({
        dynamoDBForwardMethod: method,
        dynamoDBForwardPath: path,
      });

      const result = customAdapter.getRequest(event);

      expect(result.method).toBe(method);
      expect(result.path).toBe(path);
      expect(result.headers).toHaveProperty('host', 'dynamodb.amazonaws.com');
      expect(result.headers).toHaveProperty('content-type', 'application/json');

      const [bodyBuffer, contentLength] = getEventBodyAsBuffer(
        JSON.stringify(event),
        false
      );

      expect(result.body).toBeInstanceOf(Buffer);
      expect(result.body).toStrictEqual(bodyBuffer);

      expect(result.headers).toHaveProperty(
        'content-length',
        String(contentLength)
      );
    });
  });

  describe('getResponse', () => {
    it('should return the correct mapping for the response', () => {
      const result = adapter.getResponse();

      expect(result).toBe(EmptyResponse);
    });
  });

  describe('onErrorWhileForwarding', () => {
    it('should resolver call succeed', () => {
      const event = createDynamoDBEvent();

      const error = new Error('fail because I need to test.');
      const resolver: Resolver<DynamoDBStreamEvent> = {
        fail: jest.fn(),
        succeed: jest.fn(),
      };

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: IEmptyResponse;

      adapter.getResponse = jest.fn(() => {
        getResponseResult = oldGetResponse();

        return getResponseResult;
      });

      adapter.onErrorWhileForwarding({
        event,
        error,
        resolver,
        log: {} as ILogger,
        respondWithErrors: false,
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(adapter.getResponse).toHaveBeenCalledTimes(0);

      expect(resolver.fail).toHaveBeenCalledTimes(1);
      expect(resolver.succeed).toHaveBeenCalledTimes(0);
    });
  });
});

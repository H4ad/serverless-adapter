import { beforeEach, describe, expect, it } from 'vitest';
import { getEventBodyAsBuffer } from '../../../src';
import { DynamoDBAdapter } from '../../../src/adapters/aws';
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
        false,
      );

      expect(result.body).toBeInstanceOf(Buffer);
      expect(result.body).toStrictEqual(bodyBuffer);

      expect(result.headers).toHaveProperty(
        'content-length',
        String(contentLength),
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
        false,
      );

      expect(result.body).toBeInstanceOf(Buffer);
      expect(result.body).toStrictEqual(bodyBuffer);

      expect(result.headers).toHaveProperty(
        'content-length',
        String(contentLength),
      );
    });
  });
});

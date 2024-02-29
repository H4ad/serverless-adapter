import { describe, expect, it, vitest } from 'vitest';
import {
  type DelegatedResolver,
  EmptyResponse,
  type ILogger,
  createDefaultLogger,
  getEventBodyAsBuffer,
} from '../../../src';
import { AwsSimpleAdapter } from '../../../src/adapters/aws';
import { createDynamoDBEvent } from './utils/dynamodb';
import { createSNSEvent } from './utils/sns';
import { createSQSEvent } from './utils/sqs';

const sampleEvents = [
  createSQSEvent(),
  createSNSEvent(),
  createDynamoDBEvent(),
];

class TestAdapter extends AwsSimpleAdapter<any> {}

describe(AwsSimpleAdapter.name, () => {
  describe('getAdapterName', () => {
    it('should throw not implemented error', () => {
      const adapter = new TestAdapter({
        forwardPath: '/test',
        forwardMethod: 'POST',
        host: 'test.com.com',
      });

      expect(() => adapter.getAdapterName()).toThrow('not implemented');
    });
  });

  describe('canHandle', () => {
    it('should throw not implemented error', () => {
      const adapter = new TestAdapter({
        forwardPath: '/test',
        forwardMethod: 'POST',
        host: 'test.com.com',
      });

      expect(() => adapter.canHandle(null)).toThrow('not implemented');
    });
  });

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      for (const event of sampleEvents) {
        const adapter = new TestAdapter({
          forwardPath: '/test',
          forwardMethod: 'POST',
          host: 'test.amazonaws.com',
          batch: false,
        });

        const result = adapter.getRequest(event);

        expect(result.method).toBe('POST');
        expect(result.path).toBe('/test');
        expect(result.headers).toHaveProperty('host', 'test.amazonaws.com');
        expect(result.headers).toHaveProperty(
          'content-type',
          'application/json',
        );

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
      }
    });

    it('should return the correct mapping for the request with custom path and method', () => {
      const event = createSQSEvent();

      const method = 'PUT';
      const path = '/custom/test';

      const customAdapter = new TestAdapter({
        forwardMethod: method,
        forwardPath: path,
        host: 'test.amazonaws.com',
      });

      const result = customAdapter.getRequest(event);

      expect(result.method).toBe(method);
      expect(result.path).toBe(path);
      expect(result.headers).toHaveProperty('host', 'test.amazonaws.com');
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

  describe('getResponse', () => {
    it('should throw for invalid status', () => {
      const options: [status: number, error: boolean][] = [
        [101, true],
        [200, false],
        [204, false],
        [301, false],
        [303, false],
        [400, true],
        [401, true],
        [404, true],
        [500, true],
        [503, true],
      ];

      const adapter = new TestAdapter({
        forwardPath: '/test',
        forwardMethod: 'POST',
        host: 'test.amazonaws.com',
        batch: false,
      });

      for (const [status, shouldThrowError] of options) {
        if (shouldThrowError) {
          expect(() =>
            adapter.getResponse({
              event: null,
              body: JSON.stringify({ ok: true }),
              log: createDefaultLogger(),
              headers: {},
              statusCode: status,
              isBase64Encoded: false,
            }),
          ).toThrowError(`"statusCode":${status}`);
        } else {
          expect(() =>
            adapter.getResponse({
              event: null,
              body: JSON.stringify({ ok: true }),
              log: createDefaultLogger(),
              headers: {},
              statusCode: status,
              isBase64Encoded: false,
            }),
          ).not.toThrowError(`"statusCode":${status}`);
        }
      }
    });

    describe('batch: false', () => {
      it('should not throw when body is base64', () => {
        const adapter = new TestAdapter({
          forwardPath: '/test',
          forwardMethod: 'POST',
          host: 'test.amazonaws.com',
          batch: false,
        });

        expect(() =>
          adapter.getResponse({
            event: null,
            body: JSON.stringify({ ok: true }),
            log: createDefaultLogger(),
            headers: {},
            statusCode: 200,
            isBase64Encoded: true,
          }),
        ).not.toThrowError('could not be base64 encoded');
      });

      it('should return the correct mapping for the response', () => {
        const adapter = new TestAdapter({
          forwardPath: '/test',
          forwardMethod: 'POST',
          host: 'test.amazonaws.com',
          batch: false,
        });

        const result = adapter.getResponse({
          event: null,
          body: JSON.stringify({ ok: true }),
          log: createDefaultLogger(),
          headers: {},
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(result).toBe(EmptyResponse);
      });
    });
  });

  describe('batch: true', () => {
    it('should throw when body is base64', () => {
      const adapter = new TestAdapter({
        forwardPath: '/test',
        forwardMethod: 'POST',
        host: 'test.amazonaws.com',
        batch: true,
      });

      expect(() =>
        adapter.getResponse({
          event: null,
          body: JSON.stringify({ ok: true }),
          log: createDefaultLogger(),
          headers: {},
          statusCode: 200,
          isBase64Encoded: true,
        }),
      ).toThrowError('could not be base64 encoded');
    });

    it('should return the body when response is correct', () => {
      const adapter = new TestAdapter({
        forwardPath: '/test',
        forwardMethod: 'POST',
        host: 'test.amazonaws.com',
        batch: true,
      });

      const body = { ok: true };

      const response = adapter.getResponse({
        event: null,
        body: JSON.stringify(body),
        log: createDefaultLogger(),
        headers: {},
        statusCode: 200,
        isBase64Encoded: false,
      });

      expect(response).toStrictEqual(body);
    });

    it('should return empty when body is also empty', () => {
      const adapter = new TestAdapter({
        forwardPath: '/test',
        forwardMethod: 'POST',
        host: 'test.amazonaws.com',
        batch: true,
      });

      const body = '';

      const response = adapter.getResponse({
        event: null,
        body,
        log: createDefaultLogger(),
        headers: {},
        statusCode: 200,
        isBase64Encoded: false,
      });

      expect(response).toStrictEqual(EmptyResponse);
    });
  });

  describe('onErrorWhileForwarding', () => {
    it('should resolver just call fail without get response', () => {
      const adapter = new TestAdapter({
        forwardPath: '/test',
        forwardMethod: 'POST',
        host: 'test.amazonaws.com',
        batch: true,
      });

      const error = new Error('fail because I need to test.');
      const resolver: DelegatedResolver<any> = {
        fail: vitest.fn(),
        succeed: vitest.fn(),
      };

      adapter.getResponse = vitest.fn();
      adapter.onErrorWhileForwarding({
        event: {},
        error,
        delegatedResolver: resolver,
        log: {} as ILogger,
        respondWithErrors: false,
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(adapter.getResponse).toHaveBeenCalledTimes(0);

      expect(resolver.fail).toHaveBeenCalledWith(error);
      expect(resolver.succeed).toHaveBeenCalledTimes(0);
    });
  });
});

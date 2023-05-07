import { beforeEach, describe, expect, it } from 'vitest';
import { getEventBodyAsBuffer } from '../../../src';
import { EventBridgeAdapter } from '../../../src/adapters/aws';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import { createEventBridgeEvent } from './utils/event-bridge';

describe(EventBridgeAdapter.name, () => {
  let adapter!: EventBridgeAdapter;

  beforeEach(() => {
    adapter = new EventBridgeAdapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(EventBridgeAdapter.name);
    });
  });

  createCanHandleTestsForAdapter(() => new EventBridgeAdapter(), undefined);

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const event = createEventBridgeEvent();

      const result = adapter.getRequest(event);

      expect(result.method).toBe('POST');
      expect(result.path).toBe('/eventbridge');
      expect(result.headers).toHaveProperty('host', 'events.amazonaws.com');
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
      const method = 'PUT';
      const path = '/prod/eventbridge';

      const customAdapter = new EventBridgeAdapter({
        eventBridgeForwardMethod: method,
        eventBridgeForwardPath: path,
      });

      const event = createEventBridgeEvent();

      const result = customAdapter.getRequest(event);

      expect(result.method).toBe(method);
      expect(result.path).toBe(path);
      expect(result.headers).toHaveProperty('host', 'events.amazonaws.com');
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

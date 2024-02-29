import { beforeEach, describe, expect, it, vitest } from 'vitest';
import {
  type DelegatedResolver,
  EmptyResponse,
  createDefaultLogger,
} from '../../../src';
import { DummyAdapter } from '../../../src/adapters/dummy';

describe(DummyAdapter.name, () => {
  let adapter!: DummyAdapter;

  beforeEach(() => {
    adapter = new DummyAdapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(DummyAdapter.name);
    });
  });

  describe('canHandle', () => {
    it('should always return true', () => {
      expect(adapter.canHandle()).toBe(true);
    });
  });

  describe('getRequest', () => {
    it('should always create the same request', () => {
      const request = adapter.getRequest();

      expect(request).toHaveProperty('body', undefined);
      expect(request).toHaveProperty('method', 'POST');
      expect(request).toHaveProperty('path', '/dummy');
      expect(request.headers).toStrictEqual({});
    });
  });

  describe('getResponse', () => {
    it('should always return empty response', () => {
      expect(adapter.getResponse()).toBe(EmptyResponse);
    });
  });

  describe('onErrorWhileForwarding', () => {
    it('should always resolve with success', () => {
      const resolver: DelegatedResolver<void> = {
        fail: vitest.fn(),
        succeed: vitest.fn(),
      };

      adapter.onErrorWhileForwarding({
        event: void 0,
        log: createDefaultLogger(),
        respondWithErrors: true,
        error: new Error('test'),
        delegatedResolver: resolver,
      });

      expect(resolver.succeed).toHaveBeenCalled();
    });
  });
});

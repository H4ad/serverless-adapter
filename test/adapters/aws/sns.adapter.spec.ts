import { getEventBodyAsBuffer } from '../../../src';
import { SNSAdapter } from '../../../src/adapters/aws';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import { createSNSEvent } from './utils/sns';

describe(SNSAdapter.name, () => {
  let adapter!: SNSAdapter;

  beforeEach(() => {
    adapter = new SNSAdapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(SNSAdapter.name);
    });
  });

  createCanHandleTestsForAdapter(() => new SNSAdapter(), undefined);

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const event = createSNSEvent();

      const result = adapter.getRequest(event);

      expect(result.method).toBe('POST');
      expect(result.path).toBe('/sns');
      expect(result.headers).toHaveProperty('host', 'sns.amazonaws.com');
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
      const event = createSNSEvent();

      const method = 'PUT';
      const path = '/custom/sns';

      const customAdapter = new SNSAdapter({
        snsForwardMethod: method,
        snsForwardPath: path,
      });

      const result = customAdapter.getRequest(event);

      expect(result.method).toBe(method);
      expect(result.path).toBe(path);
      expect(result.headers).toHaveProperty('host', 'sns.amazonaws.com');
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

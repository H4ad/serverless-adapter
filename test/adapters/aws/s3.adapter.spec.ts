import { getEventBodyAsBuffer } from '../../../src';
import { S3Adapter } from '../../../src/adapters/aws';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import { createS3Event } from './utils/s3';

describe(S3Adapter.name, () => {
  let adapter!: S3Adapter;

  beforeEach(() => {
    adapter = new S3Adapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(S3Adapter.name);
    });
  });

  createCanHandleTestsForAdapter(() => new S3Adapter(), undefined);

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const event = createS3Event();

      const result = adapter.getRequest(event);

      expect(result.method).toBe('POST');
      expect(result.path).toBe('/s3');
      expect(result.headers).toHaveProperty('host', 's3.amazonaws.com');
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
      const event = createS3Event();

      const method = 'PUT';
      const path = '/custom/s3';

      const customAdapter = new S3Adapter({
        s3ForwardMethod: method,
        s3ForwardPath: path,
      });

      const result = customAdapter.getRequest(event);

      expect(result.method).toBe(method);
      expect(result.path).toBe(path);
      expect(result.headers).toHaveProperty('host', 's3.amazonaws.com');
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

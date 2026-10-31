import { describe, expect, it } from 'vitest';
import { getString } from '../../src/network/utils';

describe('getString', () => {
  it('should decode a buffer', () => {
    expect(getString(Buffer.from('test'))).toBe('test');
  });

  it('should return a string as it is', () => {
    expect(getString('test')).toBe('test');
  });

  it('should decode a uint8array', () => {
    expect(getString(Uint8Array.from([0x74, 0x65, 0x73, 0x74]))).toBe('test');
  });

  it('should throw on an unsupported type', () => {
    expect(() => getString(10)).toThrowError(
      'response.write() of unexpected type: number',
    );
  });
});

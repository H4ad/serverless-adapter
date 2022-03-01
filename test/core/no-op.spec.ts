import { NO_OP } from '../../src/v2/core';

describe('NO_OP', () => {
  it('should be a function', () => {
    expect(NO_OP).toBeInstanceOf(Function);
  });

  it('should be callable and return undefined', () => {
    expect(() => NO_OP()).not.toThrowError();

    expect(NO_OP()).toBe(undefined);
  });
});

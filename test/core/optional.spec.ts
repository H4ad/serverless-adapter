import { getDefaultIfUndefined } from '../../src/v2/core';

describe('getDefaultIfUndefined', () => {
  it('should return the value when value is not undefined', () => {
    const options: [testValue: any, defaultValue: any, expectedValue: any][] = [
      ['batata', 'potato', 'batata'],
      [true, false, true],
      [false, true, false],
    ];

    for (const [testValue, defaultValue, expectedValue] of options) {
      expect(getDefaultIfUndefined(testValue, defaultValue)).toBe(
        expectedValue,
      );
    }
  });

  it('should return the default value when value is undefined', () => {
    const options: [testValue: any, defaultValue: any, expectedValue: any][] = [
      [undefined, true, true],
      [undefined, 'text', 'text'],
      [void 0, true, true],
      [void 0, 'text', 'text'],
    ];

    for (const [testValue, defaultValue, expectedValue] of options) {
      expect(getDefaultIfUndefined(testValue, defaultValue)).toBe(
        expectedValue,
      );
    }
  });
});

/**
 * Return the defaultValue whether the value is undefined, otherwise, return the value.
 *
 * @example
 * ```typescript
 * const value1 = getDefaultIfUndefined(undefined, true);
 * const value2 = getDefaultIfUndefined(false, true);
 *
 * console.log(value1);
 * // true
 * console.log(value2);
 * // false
 * ```
 *
 * @param value - The value to be checked
 * @param defaultValue - The default value when value is undefined
 *
 * @breadcrumb Core
 * @public
 */
export function getDefaultIfUndefined<T>(
  value: T | undefined,
  defaultValue: T,
): T {
  if (typeof value === 'undefined') return defaultValue;

  return value;
}

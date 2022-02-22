/**
 * Return the defaultValue whether the value is undefined, otherwise, return the value.
 *
 * @param value The value to be checked
 * @param defaultValue The default value when value is undefined
 */
export function getDefaultIfUndefined<T>(
  value: T | undefined,
  defaultValue: T,
): T {
  if (typeof value === 'undefined') return defaultValue;

  return value;
}

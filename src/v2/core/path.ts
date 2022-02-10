/**
 * Transform the path and a map of query params to a string with formatted query params
 *
 * @example```typescript
 * const path = '/pets/search';
 * const queryParams = { batata: undefined, petType: [ 'dog', 'fish' ] };
 * const result = getPathWithQueryStringParams(path, queryParams);
 * console.log(result);
 * // /pets/search?batata=&petType=dog&petType=fish
 * ```
 *
 * @param path The path
 * @param queryParams The query params
 */
export function getPathWithQueryStringParams(
  path: string,
  queryParams: string | Record<string, string | string[] | undefined>
): string {
  const searchParams = new URLSearchParams();

  if (typeof queryParams === 'string') return `${path}?${queryParams}`;

  const multiValueHeadersEntries: [string, string | string[] | undefined][] =
    Object.entries(queryParams || {});

  if (multiValueHeadersEntries.length === 0) return path;

  for (const [key, value] of multiValueHeadersEntries) {
    if (!Array.isArray(value)) {
      searchParams.append(key, value || '');
      continue;
    }

    for (const arrayValue of value) {
      searchParams.append(key, arrayValue);
    }
  }

  return `${path}?${searchParams.toString()}`;
}

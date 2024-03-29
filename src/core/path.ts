/**
 * Transform the path and a map of query params to a string with formatted query params
 *
 * @example
 * ```typescript
 * const path = '/pets/search';
 * const queryParams = { batata: undefined, petType: [ 'dog', 'fish' ] };
 * const result = getPathWithQueryStringParams(path, queryParams);
 * console.log(result);
 * // /pets/search?batata=&petType=dog&petType=fish
 * ```
 *
 * @param path - The path
 * @param queryParams - The query params
 *
 * @breadcrumb Core / Path
 * @public
 */
export function getPathWithQueryStringParams(
  path: string,
  queryParams:
    | string
    | Record<string, string | string[] | undefined>
    | undefined
    | null,
): string {
  if (String(queryParams || '').length === 0) return path;

  if (typeof queryParams === 'string') return `${path}?${queryParams}`;

  const queryParamsString = getQueryParamsStringFromRecord(queryParams);

  if (!queryParamsString) return path;

  return `${path}?${queryParamsString}`;
}

/**
 * Map query params to a string with formatted query params
 *
 * @example
 * ```typescript
 * const queryParams = { batata: undefined, petType: [ 'dog', 'fish' ] };
 * const result = getQueryParamsStringFromRecord(queryParams);
 * console.log(result);
 * // batata=&petType=dog&petType=fish
 * ```
 *
 * @param queryParamsRecord - The query params record
 *
 * @breadcrumb Core / Path
 * @public
 */
export function getQueryParamsStringFromRecord(
  queryParamsRecord:
    | Record<string, string | string[] | undefined>
    | undefined
    | null,
): string {
  const searchParams = new URLSearchParams();

  const multiValueHeadersEntries: [string, string | string[] | undefined][] =
    Object.entries(queryParamsRecord || {});

  if (multiValueHeadersEntries.length === 0) return '';

  for (const [key, value] of multiValueHeadersEntries) {
    if (!Array.isArray(value)) {
      searchParams.append(key, value || '');
      continue;
    }

    for (const arrayValue of value) searchParams.append(key, arrayValue);
  }

  return searchParams.toString();
}

/**
 * Type of the function to strip base path
 *
 * @breadcrumb Core / Path
 * @public
 */
export type StripBasePathFn = (path: string) => string;

const NOOPBasePath: StripBasePathFn = (path: string) => path;

/**
 * Get the strip base path function
 *
 * @param basePath - The base path
 *
 * @breadcrumb Core / Path
 * @public
 */
export function buildStripBasePath(
  basePath: string | undefined,
): StripBasePathFn {
  if (!basePath) return NOOPBasePath;

  const length = basePath.length;

  return (path: string) => {
    if (path.startsWith(basePath))
      return path.slice(path.indexOf(basePath) + length, path.length) || '/';

    return path;
  };
}

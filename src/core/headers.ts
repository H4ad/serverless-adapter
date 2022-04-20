//#region Imports

import { BothValueHeaders } from '../@types';

//#endregion

/**
 * Transform a header map and make sure the value is not an array
 *
 * @example
 * ```typescript
 * const headers = { 'accept-encoding': 'gzip', 'accept-language': ['en-US', 'en;q=0.9'] };
 * const flattenedHeaders = getFlattenedHeadersMap(headers, ',', true);
 * console.log(flattenedHeaders);
 * // { 'accept-encoding': 'gzip', 'accept-language': 'en-US,en;q=0.9' }
 * ```
 *
 * @param headersMap - The initial headers
 * @param separator - The separator used when we join the array of header's value
 * @param lowerCaseKey - Should put all keys in lowercase
 *
 * @breadcumb Core / Headers
 * @public
 */
export function getFlattenedHeadersMap(
  headersMap: BothValueHeaders,
  separator: string = ',',
  lowerCaseKey: boolean = false,
): Record<string, string> {
  const commaDelimitedHeaders: Record<string, string> = {};
  const headersMapEntries = Object.entries(headersMap);

  for (const [headerKey, headerValue] of headersMapEntries) {
    const newKey = lowerCaseKey ? headerKey.toLowerCase() : headerKey;

    if (Array.isArray(headerValue))
      commaDelimitedHeaders[newKey] = headerValue.join(separator);
    else commaDelimitedHeaders[newKey] = headerValue || '';
  }

  return commaDelimitedHeaders;
}

/**
 * Transforms a header map into a multi-value map header.
 *
 * @example
 * ```typescript
 * const headers = { 'accept-encoding': 'gzip', 'connection': ['keep-alive'] };
 * const multiValueHeaders = getMultiValueHeadersMap(headers);
 * console.log(multiValueHeaders);
 * // { 'accept-encoding': ['gzip'], 'connection': ['keep-alive'] }
 * ```
 *
 * @param headersMap - The initial headers
 *
 * @breadcumb Core / Headers
 * @public
 */
export function getMultiValueHeadersMap(
  headersMap: BothValueHeaders,
): Record<string, string[]> {
  const multiValueHeaders: Record<string, string[]> = {};
  const headersMapEntries = Object.entries(headersMap);

  for (const [headerKey, headerValue] of headersMapEntries) {
    multiValueHeaders[headerKey.toLowerCase()] = Array.isArray(headerValue)
      ? headerValue.map(String)
      : [String(headerValue)];
  }

  return multiValueHeaders;
}

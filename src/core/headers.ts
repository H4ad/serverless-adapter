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
 * @breadcrumb Core / Headers
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
    else commaDelimitedHeaders[newKey] = String(headerValue ?? '');
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
 * @breadcrumb Core / Headers
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

/**
 * The wrapper that holds the information about single value headers and cookies
 *
 * @breadcrumb Core / Headers
 * @public
 */
export type FlattenedHeadersAndCookies = {
  /**
   * Just the single value headers
   */
  headers: Record<string, string>;

  /**
   * The list of cookies
   */
  cookies: string[];
};

/**
 * Transforms a header map into a single value headers and cookies
 *
 * @param headersMap - The initial headers
 *
 * @breadcrumb Core / Headers
 * @public
 */
export function getFlattenedHeadersMapAndCookies(
  headersMap: BothValueHeaders,
): FlattenedHeadersAndCookies {
  const headers: FlattenedHeadersAndCookies = {
    cookies: [],
    headers: {},
  };

  for (const [headerKey, headerValue] of Object.entries(headersMap)) {
    const lowerHeaderKey = headerKey.toLowerCase();

    if (Array.isArray(headerValue)) {
      if (lowerHeaderKey !== 'set-cookie')
        headers.headers[headerKey] = headerValue.join(',');
      else headers.cookies.push(...headerValue);
    } else {
      if (lowerHeaderKey === 'set-cookie' && headerValue !== undefined)
        headers.cookies.push(headerValue ?? '');
      else headers.headers[headerKey] = String(headerValue ?? '');
    }
  }

  return headers;
}

/**
 * Parse HTTP Raw Headers
 * Attribution to {@link https://github.com/kesla/parse-headers/blob/master/parse-headers.js}
 *
 * @param headers - The raw headers
 *
 * @breadcrumb Core / Headers
 * @public
 */
export function parseHeaders(
  headers: string,
): Record<string, string | string[]> {
  if (!headers) return {};

  const result = {};
  const headersArr = headers.trim().split('\n');

  for (let i = 0; i < headersArr.length; i++) {
    const row = headersArr[i];
    const index = row.indexOf(':');
    const key = row.slice(0, index).trim().toLowerCase();
    const value = row.slice(index + 1).trim();

    if (typeof result[key] === 'undefined') result[key] = value;
    else if (Array.isArray(result[key])) result[key].push(value);
    else result[key] = [result[key], value];
  }

  return result;
}

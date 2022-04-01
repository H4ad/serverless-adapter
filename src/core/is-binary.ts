// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http

//#region Imports

import { BinarySettings, BothValueHeaders } from '../@types';
import { getFlattenedHeadersMap, getMultiValueHeadersMap } from './headers';

//#endregion

/**
 * The function that determines by the content encoding whether the response should be treated as binary
 *
 * @example```typescript
 * const headers = { 'Content-Encoding': 'gzip' };
 * const isBinary = isContentEncodingBinary(headers, ['gzip']);
 * console.log(isBinary);
 * // true
 * ```
 *
 * @param headers The headers of the response
 * @param binaryEncodingTypes The list of content encodings that will be treated as binary
 */
export function isContentEncodingBinary(
  headers: BothValueHeaders,
  binaryEncodingTypes: string[],
): boolean {
  const multiValueHeaders = getMultiValueHeadersMap(headers);

  const contentEncodings = multiValueHeaders['content-encoding'];

  if (!Array.isArray(contentEncodings)) return false;

  return contentEncodings.some(value =>
    binaryEncodingTypes.some(binaryEncoding => value.includes(binaryEncoding)),
  );
}

/**
 * The function that returns the content type of headers
 *
 * @example```typescript
 * const headers = { 'Content-Type': 'application/json' };
 * const contentType = getContentType(headers);
 * console.log(contentType);
 * // application/json
 * ```
 *
 * @param headers The headers of the response
 */
export function getContentType(headers: BothValueHeaders): string {
  const flattenedHeaders = getFlattenedHeadersMap(headers, ';', true);
  const contentTypeHeader = flattenedHeaders['content-type'] || '';

  // only compare mime type; ignore encoding part
  return contentTypeHeader.split(';')[0];
}

/**
 * The function that determines by the content type whether the response should be treated as binary
 *
 * @example```typescript
 * const headers = { 'Content-Type': 'image/png' };
 * const isBinary = isContentTypeBinary(headers, [new RegExp('^image/.*$')]);
 * console.log(isBinary);
 * // true
 * ```
 *
 * @param headers The headers of the response
 * @param binaryContentTypes The list of content types that will be treated as binary
 */
export function isContentTypeBinary(
  headers: BothValueHeaders,
  binaryContentTypes: (string | RegExp)[],
) {
  const binaryContentTypesRegexes = binaryContentTypes.map(binaryContentType =>
    binaryContentType instanceof RegExp
      ? binaryContentType
      : new RegExp(`${binaryContentType}`),
  );

  const contentType = getContentType(headers);

  if (!contentType) return false;

  return binaryContentTypesRegexes.some(binaryContentType =>
    binaryContentType.test(contentType),
  );
}

/**
 * The function used to determine from the headers and the binary settings if a response should be encoded or not
 *
 * @example```typescript
 * const headers = { 'Content-Type': 'image/png', 'Content-Encoding': 'gzip' };
 * const isContentBinary = isBinary(headers, { contentEncodings: ['gzip'], contentTypes: [new RegExp('^image/.*$')] });
 * console.log(isContentBinary);
 * // true
 *
 * @param headers The headers of the response
 * @param binarySettings The settings for the validation
 */
export function isBinary(
  headers: BothValueHeaders,
  binarySettings: BinarySettings,
): boolean {
  if ('isBinary' in binarySettings) {
    if (binarySettings.isBinary === false) return false;

    return binarySettings.isBinary(headers);
  }

  return (
    isContentEncodingBinary(headers, binarySettings.contentEncodings) ||
    isContentTypeBinary(headers, binarySettings.contentTypes)
  );
}

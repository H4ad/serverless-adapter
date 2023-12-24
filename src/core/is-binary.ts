// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http

//#region Imports

import type { BinarySettings, BothValueHeaders } from '../@types';

//#endregion

/**
 * The function that determines by the content encoding whether the response should be treated as binary
 *
 * @example
 * ```typescript
 * const headers = { 'content-encoding': 'gzip' };
 * const isBinary = isContentEncodingBinary(headers, ['gzip']);
 * console.log(isBinary);
 * // true
 * ```
 *
 * @param headers - The headers of the response
 * @param binaryEncodingTypes - The list of content encodings that will be treated as binary
 *
 * @breadcrumb Core / isBinary
 * @public
 */
export function isContentEncodingBinary(
  headers: BothValueHeaders,
  binaryEncodingTypes: string[],
): boolean {
  let contentEncodings = headers['content-encoding'];

  if (!contentEncodings) return false;

  if (!Array.isArray(contentEncodings))
    contentEncodings = contentEncodings.split(',');

  return contentEncodings.some(value =>
    binaryEncodingTypes.includes(value.trim()),
  );
}

/**
 * The function that returns the content type of headers
 *
 * @example
 * ```typescript
 * const headers = { 'content-type': 'application/json' };
 * const contentType = getContentType(headers);
 * console.log(contentType);
 * // application/json
 * ```
 *
 * @param headers - The headers of the response
 *
 * @breadcrumb Core / isBinary
 * @public
 */
export function getContentType(headers: BothValueHeaders): string {
  const contentTypeHeaderRaw = headers['content-type'];
  const contentTypeHeader = Array.isArray(contentTypeHeaderRaw)
    ? contentTypeHeaderRaw[0] || ''
    : contentTypeHeaderRaw || '';

  if (!contentTypeHeaderRaw) return '';

  // only compare mime type; ignore encoding part
  const contentTypeStart = contentTypeHeader.indexOf(';');

  if (contentTypeStart === -1) return contentTypeHeader;

  return contentTypeHeader.slice(0, contentTypeStart);
}

/**
 * The function that determines by the content type whether the response should be treated as binary
 *
 * @example
 * ```typescript
 * const headers = { 'content-type': 'image/png' };
 * const isBinary = isContentTypeBinary(headers, new Map([['image/png', true]]));
 * console.log(isBinary);
 * // true
 * ```
 *
 * @param headers - The headers of the response
 * @param binaryContentTypes - The list of content types that will be treated as binary
 *
 * @breadcrumb Core / isBinary
 * @public
 */
export function isContentTypeBinary(
  headers: BothValueHeaders,
  binaryContentTypes: string[],
) {
  const contentType = getContentType(headers);

  if (!contentType) return false;

  return binaryContentTypes.includes(contentType.trim());
}

/**
 * The function used to determine from the headers and the binary settings if a response should be encoded or not
 *
 * @example
 * ```typescript
 * const headers = { 'content-type': 'image/png', 'content-encoding': 'gzip' };
 * const isContentBinary = isBinary(headers, { contentEncodings: ['gzip'], contentTypes: ['image/png'] });
 * console.log(isContentBinary);
 * // true
 * ```
 *
 * @param headers - The headers of the response
 * @param binarySettings - The settings for the validation
 *
 * @breadcrumb Core / isBinary
 * @public
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

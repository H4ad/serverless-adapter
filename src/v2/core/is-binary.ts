// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http

//#region Imports

import { BinarySettings, BothValueHeaders } from '../@types';

//#endregion

/**
 * The function that determines by the content encoding whether the response should be treated as binary
 *
 * @param headers The headers of the response
 * @param binaryEncodingTypes The list of content encodings that will be treated as binary
 */
export function isContentEncodingBinary(
  headers: BothValueHeaders,
  binaryEncodingTypes: string[]
): boolean {
  const contentEncoding = Array.isArray(headers['content-encoding'])
    ? headers['content-encoding'][0]
    : headers['content-encoding'];

  if (typeof contentEncoding !== 'string') return false;

  return contentEncoding
    .split(',')
    .some(value =>
      binaryEncodingTypes.some(binaryEncoding => value.includes(binaryEncoding))
    );
}

/**
 * The function that returns the content type of headers
 *
 * @param headers The headers of the response
 */
export function getContentType(headers: BothValueHeaders): string {
  const contentTypeHeader = Array.isArray(headers['content-type'])
    ? headers['content-type'][0] || ''
    : headers['content-type'] || '';

  // only compare mime type; ignore encoding part
  return contentTypeHeader.split(';')[0];
}

/**
 * The function that determines by the content type whether the response should be treated as binary
 *
 * @param headers The headers of the response
 * @param binaryContentTypes The list of content types that will be treated as binary
 */
export function isContentTypeBinary(
  headers: BothValueHeaders,
  binaryContentTypes: string[]
) {
  const binaryContentTypesRegexes = binaryContentTypes.map(
    binaryContentType =>
      new RegExp(`^${binaryContentType.replace(/\*/g, '.*')}$`)
  );
  const contentType = getContentType(headers);

  if (!contentType) return false;

  return binaryContentTypesRegexes.some(binaryContentType =>
    binaryContentType.test(contentType)
  );
}

/**
 * The function used to determine from the headers and the binary settings if a response should be encoded or not
 *
 * @param headers The headers of the response
 * @param binarySettings The settings for the validation
 */
export function isBinary(
  headers: BothValueHeaders,
  binarySettings: BinarySettings
): boolean {
  if (binarySettings.isBinary === false) {
    return false;
  }

  if (typeof binarySettings.isBinary === 'function') {
    return binarySettings.isBinary(headers);
  }

  return (
    isContentEncodingBinary(headers, binarySettings.contentEncodings) ||
    isContentTypeBinary(headers, binarySettings.contentTypes)
  );
}

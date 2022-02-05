// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http
import { BinarySettings } from '../interfaces/binary-settings';
import {
  DEFAULT_BINARY_CONTENT_TYPES,
  DEFAULT_BINARY_ENCODINGS,
} from './constants';

export interface IsContentEncodingBinaryProps {
  headers: Record<any, any>;
  binaryEncodingTypes: string[];
}

function isContentEncodingBinary({
  headers,
  binaryEncodingTypes,
}: IsContentEncodingBinaryProps): boolean {
  const contentEncoding = headers['content-encoding'];

  if (typeof contentEncoding !== 'string') return false;

  return contentEncoding
    .split(',')
    .some(value =>
      binaryEncodingTypes.some(binaryEncoding => value.includes(binaryEncoding))
    );
}

export interface GetContentTypeProps {
  headers: Record<any, any>;
}

function getContentType({ headers }: GetContentTypeProps) {
  const contentTypeHeader = headers['content-type'] || '';

  // only compare mime type; ignore encoding part
  return contentTypeHeader.split(';')[0];
}

export interface IsContentTypeBinaryProps {
  headers: Record<any, any>;
  binaryContentTypes: string[];
}

function isContentTypeBinary({
  headers,
  binaryContentTypes,
}: IsContentTypeBinaryProps) {
  if (!binaryContentTypes || !Array.isArray(binaryContentTypes)) return false;

  const binaryContentTypesRegexes = binaryContentTypes.map(
    binaryContentType =>
      new RegExp(`^${binaryContentType.replace(/\*/g, '.*')}$`)
  );
  const contentType = getContentType({ headers });

  if (!contentType) return false;

  return binaryContentTypesRegexes.some(binaryContentType =>
    binaryContentType.test(contentType)
  );
}

export interface IsBinaryProps {
  headers: Record<any, any>;
  binarySettings: BinarySettings;
}

export function isBinary({ headers, binarySettings }: IsBinaryProps) {
  if (binarySettings.isBinary === false) {
    return false;
  }

  if (typeof binarySettings.isBinary === 'function') {
    return binarySettings.isBinary({ headers });
  }

  const binaryEncodingTypes =
    binarySettings.contentEncodings || DEFAULT_BINARY_ENCODINGS;
  const binaryContentTypes =
    binarySettings.contentTypes || DEFAULT_BINARY_CONTENT_TYPES;

  return (
    isContentEncodingBinary({ headers, binaryEncodingTypes }) ||
    isContentTypeBinary({ headers, binaryContentTypes })
  );
}

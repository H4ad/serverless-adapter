/**
 * Default encodings that are treated as binary, they are compared with the `Content-Encoding` header.
 *
 * @defaultValue ['gzip', 'deflate', 'br']
 * @public
 */
export const DEFAULT_BINARY_ENCODINGS: string[] = ['gzip', 'deflate', 'br'];

/**
 * Default content types that are treated as binary, they are compared with the `Content-Type` header.
 *
 * @defaultValue [new RegExp('^image/.*$'), new RegExp('^video/.*$'), 'application/pdf']
 * @public
 */
export const DEFAULT_BINARY_CONTENT_TYPES: (string | RegExp)[] = [
  new RegExp('^image/.*$'),
  new RegExp('^video/.*$'),
  'application/pdf',
];

/**
 * Type alias for empty response and can be used on some adapters when the adapter does not need to return a response.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type IEmptyResponse = {};

/**
 * Constant for empty response and can be used on some adapters when the adapter does not need to return a response.
 * @public
 */
export const EmptyResponse: IEmptyResponse = {};

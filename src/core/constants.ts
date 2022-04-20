/**
 * Default encodings that are treated as binary, they are compared with the `Content-Encoding` header.
 *
 * @breadcumb Core / Constants
 * @defaultValue ['gzip', 'deflate', 'br']
 * @public
 */
export const DEFAULT_BINARY_ENCODINGS: string[] = ['gzip', 'deflate', 'br'];

/**
 * Default content types that are treated as binary, they are compared with the `Content-Type` header.
 *
 * @breadcumb Core / Constants
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
 *
 * @breadcumb Core / Constants
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type IEmptyResponse = {};

/**
 * Constant for empty response and can be used on some adapters when the adapter does not need to return a response.
 *
 * @breadcumb Core / Constants
 * @public
 */
export const EmptyResponse: IEmptyResponse = {};

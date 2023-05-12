/**
 * Default encodings that are treated as binary, they are compared with the `Content-Encoding` header.
 *
 * @breadcrumb Core / Constants
 * @defaultValue ['gzip', 'deflate', 'br']
 * @public
 */
export const DEFAULT_BINARY_ENCODINGS: string[] = ['gzip', 'deflate', 'br'];

/**
 * Default content types that are treated as binary, they are compared with the `Content-Type` header.
 *
 * @breadcrumb Core / Constants
 * @defaultValue ['image/png', 'image/jpeg', 'image/jpg', 'image/avif', 'image/bmp', 'image/x-png', 'image/gif', 'image/webp', 'video/mp4', 'application/pdf']
 * @public
 */
export const DEFAULT_BINARY_CONTENT_TYPES: string[] = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/avif',
  'image/bmp',
  'image/x-png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'application/pdf',
];

/**
 * Type alias for empty response and can be used on some adapters when the adapter does not need to return a response.
 *
 * @breadcrumb Core / Constants
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type IEmptyResponse = {};

/**
 * Constant for empty response and can be used on some adapters when the adapter does not need to return a response.
 *
 * @breadcrumb Core / Constants
 * @public
 */
export const EmptyResponse: IEmptyResponse = {};

export const DEFAULT_BINARY_ENCODINGS: string[] = ['gzip', 'deflate', 'br'];
export const DEFAULT_BINARY_CONTENT_TYPES: (string | RegExp)[] = [
  new RegExp('^image/.*$'),
  new RegExp('^video/.*$'),
  'application/pdf',
];

// eslint-disable-next-line @typescript-eslint/ban-types
export type IEmptyResponse = {};
export const EmptyResponse: IEmptyResponse = {};

/**
 * The record that represents the headers that doesn't have multiple values in the value
 *
 * @example
 * ```typescript
 * { 'Accept-Encoding': 'gzip, deflate, br' }
 * ```
 *
 * @breadcrumb Types
 * @public
 */
export type SingleValueHeaders = Record<string, string | undefined>;

/**
 * The record that represents the headers that have multiple values in the value
 *
 * @example
 * ```typescript
 * { 'Accept-Encoding': ['gzip', 'deflate', 'br'] }
 * ```
 *
 * @breadcrumb Types
 * @public
 */
export type MultiValueHeaders = Record<string, string[] | undefined>;

/**
 * The record that represents the headers that can both single or multiple values in the value
 *
 * @example
 * ```typescript
 * { 'Accept-Encoding': ['gzip', 'deflate', 'br'], 'Host': 'xyz.execute-api.us-east-1.amazonaws.com' }
 * ```
 *
 * @breadcrumb Types
 * @public
 */
export type BothValueHeaders = Record<string, string | string[] | undefined>;

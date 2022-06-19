/**
 * The interface representing the binary settings implementation by function
 *
 * @breadcrumb Types / BinarySettings
 * @public
 */
export interface BinarySettingsFunction {
  /**
   * This property can be a function that receives the response headers and returns whether that response should be encoded as binary.
   * Otherwise, you can specify not to treat any response as binary by putting `false` in this property.
   *
   * @remarks Setting this property prevents the `contentTypes` and `contentEncodings` properties from being used.
   */
  isBinary:
    | ((headers: Record<string, string | string[] | undefined>) => boolean)
    | false;
}

/**
 * The interface representing the binary settings implementation by looking inside the headers
 *
 * @breadcrumb Types / BinarySettings
 * @public
 */
export interface BinarySettingsContentHeaders {
  /**
   * The list of content types that will be treated as binary
   */
  contentTypes: (string | RegExp)[];

  /**
   * The list of content encodings that will be treated as binary
   */
  contentEncodings: string[];
}

/**
 * The interface representing the settings for whether the response should be treated as binary or not
 *
 * @remarks Encoded as binary means the response body will be converted to base64
 *
 * @breadcrumb Types / BinarySettings
 * @public
 */
export type BinarySettings =
  | BinarySettingsFunction
  | BinarySettingsContentHeaders;

export interface BinarySettings {
  isBinary?: (({ headers: any }) => boolean) | boolean;
  contentTypes?: string[];
  contentEncodings?: string[];
}

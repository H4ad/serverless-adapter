import { ApiItem, ApiParameterListMixin } from '@microsoft/api-extractor-model';

export class CustomUtilities {
  private static readonly _badFilenameCharsRegExp: RegExp = /[^a-z0-9_\-\.]/gi;

  /**
   * Generates a concise signature for a function.  Example: "getArea(width, height)"
   */
  public static getConciseSignature(apiItem: ApiItem): string {
    if (ApiParameterListMixin.isBaseClassOf(apiItem)) {
      return (
        apiItem.displayName +
        '(' +
        apiItem.parameters.map(x => x.name).join(', ') +
        ')'
      );
    }
    return apiItem.displayName;
  }

  /**
   * Converts bad filename characters to underscores.
   */
  public static getSafeFilenameForName(name: string): string {
    // TODO: This can introduce naming collisions.
    // We will fix that as part of https://github.com/microsoft/rushstack/issues/1308
    return name
      .replace(CustomUtilities._badFilenameCharsRegExp, '_')
      .toLowerCase();
  }

  /**
   * Converts bad filename characters to underscores.
   */
  public static getSafeFilenameForNameWithCase(name: string): string {
    // TODO: This can introduce naming collisions.
    // We will fix that as part of https://github.com/microsoft/rushstack/issues/1308
    return name.replace(CustomUtilities._badFilenameCharsRegExp, '_');
  }
}

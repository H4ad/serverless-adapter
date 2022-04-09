export interface APIDoc {
  metadata: Metadata;
  kind: string;
  canonicalReference: string;
  docComment: string;
  name: string;
  members: APIDocMember[];
}

export interface APIDocMember {
  kind: string;
  canonicalReference: string;
  name: string;
  members: PurpleMember[];
}

export interface PurpleMember {
  kind: PurpleKind;
  canonicalReference: string;
  docComment: string;
  excerptTokens: ExcerptToken[];
  releaseTag: ReleaseTag;
  typeParameters?: TypeParameter[];
  name: string;
  members?: FluffyMember[];
  extendsTokenRanges?: any[];
  implementsTokenRanges?: TokenRange[];
  typeTokenRange?: TokenRange;
  returnTypeTokenRange?: TokenRange;
  overloadIndex?: number;
  parameters?: Parameter[];
  variableTypeTokenRange?: TokenRange;
  extendsTokenRange?: TokenRange;
}

export interface ExcerptToken {
  kind: ExcerptTokenKind;
  text: string;
  canonicalReference?: string;
}

export enum ExcerptTokenKind {
  Content = 'Content',
  Reference = 'Reference',
}

export interface TokenRange {
  startIndex: number;
  endIndex: number;
}

export enum PurpleKind {
  Class = 'Class',
  Function = 'Function',
  Interface = 'Interface',
  TypeAlias = 'TypeAlias',
  Variable = 'Variable',
}

export interface FluffyMember {
  kind: FluffyKind;
  canonicalReference: string;
  docComment: string;
  excerptTokens: ExcerptToken[];
  isOptional?: boolean;
  returnTypeTokenRange?: TokenRange;
  releaseTag: ReleaseTag;
  overloadIndex?: number;
  parameters?: Parameter[];
  name?: string;
  propertyTypeTokenRange?: TokenRange;
  isStatic?: boolean;
  typeParameters?: TypeParameter[];
}

export enum FluffyKind {
  Constructor = 'Constructor',
  Method = 'Method',
  MethodSignature = 'MethodSignature',
  Property = 'Property',
  PropertySignature = 'PropertySignature',
}

export interface Parameter {
  parameterName: string;
  parameterTypeTokenRange: TokenRange;
  isOptional: boolean;
}

export enum ReleaseTag {
  Public = 'Public',
}

export interface TypeParameter {
  typeParameterName: TypeParameterName;
  constraintTokenRange: TokenRange;
  defaultTypeTokenRange: TokenRange;
}

export enum TypeParameterName {
  T = 'T',
  TApp = 'TApp',
  TCallback = 'TCallback',
  TContext = 'TContext',
  TEvent = 'TEvent',
  TResponse = 'TResponse',
  TReturn = 'TReturn',
  TStream = 'TStream',
}

export interface Metadata {
  toolPackage: string;
  toolVersion: string;
  schemaVersion: number;
  oldestForwardsCompatibleVersion: number;
  tsdocConfig: TsdocConfig;
}

export interface TsdocConfig {
  $schema: string;
  noStandardTags: boolean;
  tagDefinitions: TagDefinition[];
  supportForTags: { [key: string]: boolean };
}

export interface TagDefinition {
  tagName: string;
  syntaxKind: SyntaxKind;
  allowMultiple?: boolean;
}

export enum SyntaxKind {
  Block = 'block',
  Inline = 'inline',
  Modifier = 'modifier',
}

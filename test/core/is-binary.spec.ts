import { describe, expect, it } from 'vitest';
import {
  BothValueHeaders,
  DEFAULT_BINARY_CONTENT_TYPES,
  DEFAULT_BINARY_ENCODINGS,
  getContentType,
  isBinary,
  isContentEncodingBinary,
  isContentTypeBinary,
} from '../../src';

type HeaderListJest = [headers: BothValueHeaders, expectedValue: boolean][];

const headerListForContentEncodings: HeaderListJest = [
  [{ 'content-encoding': undefined }, false],
  [{ 'content-encoding': [] }, false],
  [{ 'content-encoding': 'non-standard' }, false],
  [{ 'content-encoding': ['non-standard'] }, false],
  [{ 'content-encoding': 'gzip' }, true],
  [{ 'content-encoding': 'deflate' }, true],
  [{ 'content-encoding': 'br' }, true],
  [{ 'content-encoding': 'gzip,non-standard' }, true],
  [{ 'content-encoding': ['gzip'] }, true],
  [{ 'content-encoding': ['gzip', 'non-standard'] }, true],
  [{ 'content-encoding': ['deflate'] }, true],
  [{ 'content-encoding': ['deflate', 'non-standard'] }, true],
  [{ 'content-encoding': ['br'] }, true],
  [{ 'content-encoding': ['br', 'non-standard'] }, true],
];

const headerListForContentTypes: HeaderListJest = [
  [{ 'content-type': undefined }, false],
  [{ 'content-type': [] }, false],
  [{ 'content-type': 'application/json' }, false],
  [{ 'content-type': ['application/json'] }, false],
  [{ 'content-type': 'application/json,image/png' }, false],
  [{ 'content-type': 'application/json;image/png' }, false],
  [{ 'content-type': ['application/json', 'image/png'] }, false],
  [{ 'content-type': 'image/png' }, true],
  [{ 'content-type': ['image/png'] }, true],
  [{ 'content-type': 'video/mp4' }, true],
  [{ 'content-type': ['video/mp4'] }, true],
  [{ 'content-type': 'application/pdf' }, true],
  [{ 'content-type': ['application/pdf'] }, true],
];

describe('isContentEncodingBinary', () => {
  it('should correctly check if content encoding is binary', () => {
    const headersList: HeaderListJest = [
      [{ 'content-type': 'application/json' }, false],
      ...headerListForContentEncodings,
    ];

    const binaryEncodings = DEFAULT_BINARY_ENCODINGS;

    for (const [headers, expectedValue] of headersList) {
      const isBinary = isContentEncodingBinary(headers, binaryEncodings);

      expect(isBinary).toBe(expectedValue);
    }
  });
});

describe('getContentType', () => {
  it('should correctly return the content type from headers', () => {
    const headersList: [headers: BothValueHeaders, expectedValue: string][] = [
      [{ 'content-encoding': 'gzip' }, ''],
      [{ 'content-type': 'application/json' }, 'application/json'],
      [{ 'content-type': ['application/json'] }, 'application/json'],
      [
        { 'content-type': 'application/json,image/png' },
        'application/json,image/png',
      ],
      [{ 'content-type': 'application/json;image/png' }, 'application/json'],
      [
        { 'content-type': ['application/json', 'image/png'] },
        'application/json',
      ],
      [{ 'content-type': ['image/png', 'application/json'] }, 'image/png'],
    ];

    for (const [headers, expectedValue] of headersList) {
      const isBinary = getContentType(headers);

      expect(isBinary).toBe(expectedValue);
    }
  });
});

describe('isContentTypeBinary', () => {
  it('should correctly check if content type is binary', () => {
    const headersList: [headers: BothValueHeaders, expectedValue: boolean][] = [
      [{ 'content-encoding': 'gzip' }, false],
      ...headerListForContentTypes,
    ];

    const binaryEncodings = DEFAULT_BINARY_CONTENT_TYPES;

    for (const [headers, expectedValue] of headersList) {
      const isBinary = isContentTypeBinary(headers, binaryEncodings);

      expect(isBinary).toBe(expectedValue);
    }
  });
});

describe('isBinary', () => {
  it('should correctly return if content is binary', () => {
    const headersList: [headers: BothValueHeaders, expectedValue: boolean][] = [
      [{ Host: 'blablabla.com' }, false],
      ...headerListForContentEncodings,
      ...headerListForContentTypes,
    ];

    const contentTypes = DEFAULT_BINARY_CONTENT_TYPES;
    const contentEncodings = DEFAULT_BINARY_ENCODINGS;

    for (const [headers, expectedValue] of headersList) {
      const isContentBinary = isBinary(headers, {
        contentTypes,
        contentEncodings,
      });

      expect(
        isContentBinary,
        `contentTypes: ${contentTypes.join(
          ';',
        )}, contentEncodings: ${contentEncodings.join(
          ';',
        )}: has ${expectedValue} inside ${JSON.stringify(headers)}`,
      ).toBe(expectedValue);
    }
  });

  it('should correctly return if content is binary with custom "isBinary" option', () => {
    const headersList: [headers: BothValueHeaders, expectedValue: boolean][] = [
      [{ Host: 'blablabla.com' }, false],
      ...headerListForContentEncodings,
      ...headerListForContentTypes,
    ];

    for (const [headers] of headersList) {
      const isContentBinary = isBinary(headers, {
        isBinary: () => true,
      });

      expect(isContentBinary).toBe(true);
    }

    for (const [headers] of headersList) {
      const isContentBinary = isBinary(headers, {
        isBinary: false,
      });

      expect(isContentBinary).toBe(false);
    }
  });
});

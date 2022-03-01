import { BothValueHeaders } from '../../src/v2/@types';
import {
  DEFAULT_BINARY_CONTENT_TYPES,
  DEFAULT_BINARY_ENCODINGS,
  getContentType,
  isBinary,
  isContentEncodingBinary,
  isContentTypeBinary,
} from '../../src/v2/core';

type HeaderListJest = [headers: BothValueHeaders, expectedValue: boolean][];

const headerListForContentEncodings: HeaderListJest = [
  [{ 'Content-Encoding': undefined }, false],
  [{ 'Content-Encoding': [] }, false],
  [{ 'Content-Encoding': 'non-standard' }, false],
  [{ 'Content-Encoding': ['non-standard'] }, false],
  [{ 'Content-Encoding': 'gzip' }, true],
  [{ 'Content-Encoding': 'deflate' }, true],
  [{ 'Content-Encoding': 'br' }, true],
  [{ 'Content-Encoding': 'gzip,non-standard' }, true],
  [{ 'Content-Encoding': ['gzip'] }, true],
  [{ 'Content-Encoding': ['gzip', 'non-standard'] }, true],
  [{ 'Content-Encoding': ['deflate'] }, true],
  [{ 'Content-Encoding': ['deflate', 'non-standard'] }, true],
  [{ 'Content-Encoding': ['br'] }, true],
  [{ 'Content-Encoding': ['br', 'non-standard'] }, true],
];

const headerListForContentTypes: HeaderListJest = [
  [{ 'Content-Type': undefined }, false],
  [{ 'Content-Type': [] }, false],
  [{ 'Content-Type': 'application/json' }, false],
  [{ 'Content-Type': ['application/json'] }, false],
  [{ 'Content-Type': 'application/json,image/png' }, false],
  [{ 'Content-Type': 'application/json;image/png' }, false],
  [{ 'Content-Type': ['application/json', 'image/png'] }, false],
  [{ 'Content-Type': 'image/png' }, true],
  [{ 'Content-Type': ['image/png'] }, true],
  [{ 'Content-Type': 'video/mp4' }, true],
  [{ 'Content-Type': ['video/mp4'] }, true],
  [{ 'Content-Type': 'application/pdf' }, true],
  [{ 'Content-Type': ['application/pdf'] }, true],
];

describe('isContentEncodingBinary', () => {
  it('should correctly check if content encoding is binary', () => {
    const headersList: HeaderListJest = [
      [{ 'Content-Type': 'application/json' }, false],
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
      [{ 'Content-Encoding': 'gzip' }, ''],
      [{ 'Content-Type': 'application/json' }, 'application/json'],
      [{ 'Content-Type': ['application/json'] }, 'application/json'],
      [
        { 'Content-Type': 'application/json,image/png' },
        'application/json,image/png',
      ],
      [{ 'Content-Type': 'application/json;image/png' }, 'application/json'],
      [
        { 'Content-Type': ['application/json', 'image/png'] },
        'application/json',
      ],
      [{ 'Content-Type': ['image/png', 'application/json'] }, 'image/png'],
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
      [{ 'Content-Encoding': 'gzip' }, false],
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

      expect(isContentBinary).toBe(expectedValue);
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

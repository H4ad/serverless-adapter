import {
  getPathWithQueryStringParams,
  getQueryParamsStringFromRecord,
} from '../../src/v2/core';

describe('getPathWithQueryStringParams', () => {
  it('should correctly return path and query string concaneted', () => {
    const options: [
      path: string,
      queryParams:
        | string
        | Record<string, string | string[] | undefined>
        | undefined
        | null,
      expectedValue: string,
    ][] = [
      ['/users', undefined, '/users'],
      ['/users', null, '/users'],
      ['/users', 'limit=100', '/users?limit=100'],
      ['/users', {}, '/users'],
      ['/users', { page: '1' }, '/users?page=1'],
      ['/users', { page: '1', limit: '100' }, '/users?page=1&limit=100'],
      [
        '/users',
        { page: '1', limit: '100', s: undefined },
        '/users?page=1&limit=100&s=',
      ],
      ['/users', { joins: ['details'] }, '/users?joins=details'],
      [
        '/users',
        { joins: ['details', 'address'] },
        '/users?joins=details&joins=address',
      ],
      [
        '/users',
        {
          page: '1',
          limit: '100',
          s: undefined,
          joins: ['details', 'address'],
        },
        '/users?page=1&limit=100&s=&joins=details&joins=address',
      ],
    ];

    for (const [path, queryParams, expectedValue] of options) {
      expect(getPathWithQueryStringParams(path, queryParams)).toBe(
        expectedValue,
      );
    }
  });
});

describe('getQueryParamsStringFromRecord', () => {
  it('should correctly return query string from values', () => {
    const options: [
      queryParams:
        | Record<string, string | string[] | undefined>
        | undefined
        | null,
      expectedValue: string,
    ][] = [
      [undefined, ''],
      [null, ''],
      [{ page: '1' }, 'page=1'],
      [{ page: '1', limit: '100' }, 'page=1&limit=100'],
      [{ page: '1', limit: '100', s: undefined }, 'page=1&limit=100&s='],
      [{ joins: ['details'] }, 'joins=details'],
      [{ joins: ['details', 'address'] }, 'joins=details&joins=address'],
      [
        {
          page: '1',
          limit: '100',
          s: undefined,
          joins: ['details', 'address'],
        },
        'page=1&limit=100&s=&joins=details&joins=address',
      ],
    ];

    for (const [queryParams, expectedValue] of options)
      expect(getQueryParamsStringFromRecord(queryParams)).toBe(expectedValue);
  });
});

import { describe, expect, it } from 'vitest';
import {
  buildStripBasePath,
  getPathWithQueryStringParams,
  getQueryParamsStringFromRecord,
} from '../../src';

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

describe('buildStripBasePath', () => {
  it('should correctly return query string from values', () => {
    const options: [
      basePath: string | undefined,
      path: string,
      expectedValue: string,
    ][] = [
      ['/prod', '/prod/users', '/users'],
      ['/v1', '/v1/potato', '/potato'],
      ['', '/v1/users', '/v1/users'],
      [undefined, '/v1/courses', '/v1/courses'],
      ['/prod', '/prod', '/'],
      ['/prod', '/ignore-path', '/ignore-path'],
      ['/v1', '/prod/v1/ignore-path', '/prod/v1/ignore-path'],
    ];

    for (const [basePath, path, expectedValue] of options)
      expect(buildStripBasePath(basePath)(path)).toBe(expectedValue);
  });
});

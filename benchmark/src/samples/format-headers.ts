import benchmark from 'benchmark';
import { BothValueHeaders } from '../../../src';
import { createApiGatewayV1 } from '../events';

function getFlattenedHeadersMap(
  headersMap: BothValueHeaders,
  separator: string = ',',
  lowerCaseKey: boolean = false,
): Record<string, string> {
  const commaDelimitedHeaders: Record<string, string> = {};
  const headersMapEntries = Object.entries(headersMap);

  for (const [headerKey, headerValue] of headersMapEntries) {
    const newKey = lowerCaseKey ? headerKey.toLowerCase() : headerKey;

    if (Array.isArray(headerValue))
      commaDelimitedHeaders[newKey] = headerValue.join(separator);
    else commaDelimitedHeaders[newKey] = String(headerValue ?? '');
  }

  return commaDelimitedHeaders;
}

function getFlattenedHeadersV2(
  headersMap: BothValueHeaders,
  separator: string = ',',
  lowerCaseKey: boolean = false,
): Record<string, string> {
  const commaDelimitedHeaders: Record<string, string> = {};

  for (const [headerKey, headerValue] of Object.entries(headersMap)) {
    const newKey = lowerCaseKey ? headerKey.toLowerCase() : headerKey;

    if (Array.isArray(headerValue))
      commaDelimitedHeaders[newKey] = headerValue.join(separator);
    else commaDelimitedHeaders[newKey] = (headerValue ?? '') + '';
  }

  return commaDelimitedHeaders;
}

function getFlattenedHeadersV3(
  headersMap: BothValueHeaders,
  separator: string = ',',
  lowerCaseKey: boolean = false,
): Record<string, string> {
  return Object.keys(headersMap).reduce((acc, headerKey) => {
    const newKey = lowerCaseKey ? headerKey.toLowerCase() : headerKey;
    const headerValue = headersMap[headerKey];

    if (Array.isArray(headerValue)) acc[newKey] = headerValue.join(separator);
    else acc[newKey] = (headerValue ?? '') + '';

    return acc;
  }, {});
}

const eventV1ApiGateway = createApiGatewayV1('GET', '/test');

const suite = new benchmark.Suite();

suite.add('getFlattenedHeadersMap', () =>
  getFlattenedHeadersMap(eventV1ApiGateway.headers),
);
suite.add('getFlattenedHeadersV2', () =>
  getFlattenedHeadersV2(eventV1ApiGateway.headers),
);
suite.add('getFlattenedHeadersV3', () =>
  getFlattenedHeadersV3(eventV1ApiGateway.headers),
);

suite
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({
    async: false,
  });

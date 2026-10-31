import { Suite } from 'bench-node';
import { BothValueHeaders } from '@h4ad/serverless-adapter';
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

const suite = new Suite();

let result: Record<string, string>;

suite.add('getFlattenedHeadersMap', () => {
  result = getFlattenedHeadersMap(eventV1ApiGateway.headers);
});
suite.add('getFlattenedHeadersV2', () => {
  result = getFlattenedHeadersV2(eventV1ApiGateway.headers);
});
suite.add('getFlattenedHeadersV3', () => {
  result = getFlattenedHeadersV3(eventV1ApiGateway.headers);
});

suite
  .run()
  .then(() => console.log(`last result had ${Object.keys(result).length} keys`))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

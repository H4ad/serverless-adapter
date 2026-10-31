import { Suite } from 'bench-node';
import { createApiGatewayV1 } from '../events';

const headers = createApiGatewayV1('GET', '/pat2').headers;
const suite = new Suite();

let result: unknown;

suite.add('{...}', () => {
  result = { ...headers };
});
suite.add('structuredClone', () => {
  result = structuredClone(headers);
});
suite.add('JSON.parse + JSON.stringify', () => {
  result = JSON.parse(JSON.stringify(headers));
});
suite.add('for loop + object.keys', () => {
  const copy: Record<string, unknown> = {};

  for (const key of Object.keys(headers)) copy[key] = headers[key];

  result = copy;
});

suite
  .run()
  .then(() => console.log(`last result had ${Object.keys(result as object).length} keys`))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

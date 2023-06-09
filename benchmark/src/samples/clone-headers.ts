import benchmark from 'benchmark';
import { createApiGatewayV1 } from '../events';

const eventV1ApiGateway = createApiGatewayV1('GET', '/test');

const randomTest = [
  createApiGatewayV1('GET', '/pat2'),
  createApiGatewayV1('GET', '/pat3'),
];
const headers = createApiGatewayV1('GET', '/pat2').headers;
const suite = new benchmark.Suite();

suite.add('{...}', () => {
  const result = { ...headers };
});
suite.add('structuredClone', () =>
  structuredClone(headers),
);
suite.add('JSON.parse + JSON.stringify', () =>
  JSON.parse(JSON.stringify(headers)),
);
suite.add('for loop + object.keys', () => {
  const headers = {};

  for (const key of Object.keys([Math.floor(Math.random() * 2)]))
    headers[key] = headers[key];
});

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

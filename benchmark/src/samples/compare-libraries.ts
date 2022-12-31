import { ApiGatewayV1Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws/index.js';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express/index.js';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default/index.js';
import { ServerlessAdapter } from '@h4ad/serverless-adapter/lib/index.js';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise/index.js';
import cronometro from 'cronometro';
import express from 'express';
import vendia from '@vendia/serverless-express';
import serverlessHttp from 'serverless-http';
import { createApiGatewayV1 } from '../events.js';

console.log('Running simply-forward.ts');

const app = express();

app.get('/test', (_, res) => res.send('Hello World'));

const handler = ServerlessAdapter.new(app)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .setFramework(new ExpressFramework())
  .addAdapter(new ApiGatewayV1Adapter())
  .build();

const vendiaHandler = vendia({
  app,
});

const serverlessHttpHandler = serverlessHttp(app);

const context = {} as any;
const callback = {} as any;

const eventV1ApiGateway = createApiGatewayV1('GET', '/test');

cronometro({
  '@h4ad/serverless-adapter'() {
    return handler(eventV1ApiGateway, context, callback);
  },
  '@vendia/serverless-express'() {
    return vendiaHandler(eventV1ApiGateway, context, callback);
  },
  'serverless-http'() {
    return serverlessHttpHandler(eventV1ApiGateway, context);
  },
}, {
  warmup: true,
});

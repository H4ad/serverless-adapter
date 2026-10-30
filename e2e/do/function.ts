import { HttpFunctionAdapter } from '../../src/adapters/digital-ocean';
import { ExpressFramework } from '../../src/frameworks/express';
import { DigitalOceanHandler } from '../../src/handlers/digital-ocean';
import { PromiseResolver } from '../../src/resolvers/promise';
import { ServerlessAdapter } from '../../src/serverless-adapter';
import { createApp } from '../fixture/app';

const app = createApp();

export const main = ServerlessAdapter.new(app)
  .setFramework(new ExpressFramework())
  .setHandler(new DigitalOceanHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new HttpFunctionAdapter())
  .build();

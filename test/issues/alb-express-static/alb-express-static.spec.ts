import { resolve } from 'path';
import type { ALBResult } from 'aws-lambda';
import express from 'express';
import { AlbAdapter } from '../../../src/adapters/aws/index';
import { ExpressFramework } from '../../../src/frameworks/express/index';
import { DefaultHandler } from '../../../src/handlers/default/index';
import { PromiseResolver } from '../../../src/resolvers/promise/index';
import { ServerlessAdapter } from '../../../src/index';
import { createAlbEvent } from '../../adapters/aws/utils/alb-event';

describe('ALB rejecting response when uses express.static because', () => {
  it('returns some headers that are not string', async () => {
    const app = express();

    app.use(express.static(resolve(__dirname)));

    const handler = ServerlessAdapter.new(app)
      .setHandler(new DefaultHandler())
      .setFramework(new ExpressFramework())
      .setResolver(new PromiseResolver())
      .addAdapter(new AlbAdapter())
      .build();

    const albEvent = createAlbEvent('GET', '/robots.txt');

    const response = (await handler(albEvent, {})) as ALBResult;

    for (const header of Object.keys(response.headers || {})) {
      expect(`typeof ${header}: ${typeof response.headers![header]}`).toBe(
        `typeof ${header}: string`,
      );
    }
  });
});

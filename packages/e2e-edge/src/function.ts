import type {
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
} from 'aws-lambda';
import { RequestLambdaEdgeAdapter } from '../../../src/adapters/aws';
import { ExpressFramework } from '../../../src/frameworks/express';
import { DefaultHandler } from '../../../src/handlers/default';
import { PromiseResolver } from '../../../src/resolvers/promise';
import { ServerlessAdapter } from '../../../src/serverless-adapter';
import { createApp } from '@e2e/core/fixture/app';

/**
 * The documented path: answer at origin-request, where the response can be up
 * to 1 MB and the request body is available because the association sets
 * IncludeBody.
 */
export const originRequest = ServerlessAdapter.new(createApp())
  .setFramework(new ExpressFramework())
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new RequestLambdaEdgeAdapter())
  .build() as unknown as (
  event: CloudFrontRequestEvent,
  context: unknown,
) => Promise<CloudFrontRequestResult>;

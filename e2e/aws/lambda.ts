import {
  AlbAdapter,
  ApiGatewayV1Adapter,
  ApiGatewayV2Adapter,
  DynamoDBAdapter,
  EventBridgeAdapter,
  S3Adapter,
  SNSAdapter,
  SQSAdapter,
} from '../../src/adapters/aws';
import { ExpressFramework } from '../../src/frameworks/express';
import { DefaultHandler } from '../../src/handlers/default';
import { PromiseResolver } from '../../src/resolvers/promise';
import { ServerlessAdapter } from '../../src/serverless-adapter';
import { createApp } from '../fixture/app';

const app = createApp({
  onEventResult(source, body) {
    // The smoke reads this line back from CloudWatch Logs. Base64 keeps the
    // payload intact through the log pipeline.
    console.log('E2E_RESULT', source, body.toString('base64'));
  },
});

export const handler = ServerlessAdapter.new(app)
  .setFramework(new ExpressFramework())
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  .addAdapter(new ApiGatewayV1Adapter())
  .addAdapter(new AlbAdapter())
  .addAdapter(new SQSAdapter())
  .addAdapter(new SNSAdapter())
  .addAdapter(new S3Adapter())
  .addAdapter(new DynamoDBAdapter())
  .addAdapter(new EventBridgeAdapter())
  .build();

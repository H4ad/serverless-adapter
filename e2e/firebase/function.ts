import { DummyAdapter } from '../../src/adapters/dummy';
import { ExpressFramework } from '../../src/frameworks/express';
import { HttpFirebaseV2Handler } from '../../src/handlers/firebase';
import { DummyResolver } from '../../src/resolvers/dummy';
import { ServerlessAdapter } from '../../src/serverless-adapter';
import { createApp } from '../fixture/app';

/**
 * The generated entry binds this handler to an export name that carries the
 * run id, so the module returns the handler instead of exporting one.
 */
export function createHandler() {
  return ServerlessAdapter.new(createApp())
    .setFramework(new ExpressFramework())
    .setHandler(new HttpFirebaseV2Handler())
    .setResolver(new DummyResolver())
    .addAdapter(new DummyAdapter())
    .build();
}

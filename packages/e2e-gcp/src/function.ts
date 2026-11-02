import { DummyAdapter } from '../../../src/adapters/dummy';
import { ExpressFramework } from '../../../src/frameworks/express';
import { GCPHandler } from '../../../src/handlers/gcp';
import { DummyResolver } from '../../../src/resolvers/dummy';
import { ServerlessAdapter } from '../../../src';
import { createApp } from '@e2e/core/fixture/app';

// gcloud sets FUNCTION_TARGET from --entry-point, and the handler registers
// itself with the functions framework under that exact name. Nothing is
// exported because GCPHandler owns the registration.
const functionName = process.env.FUNCTION_TARGET ?? 'sae2eGcp';

ServerlessAdapter.new(createApp())
  .setFramework(new ExpressFramework())
  .setHandler(new GCPHandler(functionName))
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();

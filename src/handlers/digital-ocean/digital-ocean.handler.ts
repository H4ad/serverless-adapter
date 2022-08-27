/* eslint-disable @typescript-eslint/unbound-method */
//#region Imports

import { DefaultHandler } from '../default';

//#endregion

/**
 * The class that implements a serverless handler for Digital Ocean Functions.
 *
 * @breadcrumb Handlers / DigitalOceanHandler
 * @public
 */
export class DigitalOceanHandler<
  TApp,
  TEvent,
  TResponse,
  TReturn,
> extends DefaultHandler<TApp, TEvent, void, void, TResponse, TReturn> {}

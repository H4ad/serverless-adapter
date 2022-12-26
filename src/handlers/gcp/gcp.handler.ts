//#region Imports

import { IncomingMessage, ServerResponse } from 'http';
import { http } from '@google-cloud/functions-framework';
import { FrameworkContract, HandlerContract } from '../../contracts';
import { RawRequest } from '../base/index';

//#endregion

/**
 * The class that implements a handler for GCP Http Functions
 *
 * @remarks Read more about Http Cloud Function {@link https://cloud.google.com/functions/docs/create-deploy-http-nodejs | here}
 *
 * @breadcrumb Handlers / GCPHandler
 * @public
 */
export class GCPHandler<TApp>
  extends RawRequest<TApp>
  implements
    HandlerContract<TApp, never, never, never, void, void | Promise<void>>
{
  //#region Constructor

  /**
   * Default Constructor
   *
   * @param name - The name of this function, should be the during deploy.
   */
  constructor(protected readonly name: string) {
    super();
  }

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
  ): (req: IncomingMessage, res: ServerResponse) => void | Promise<void> {
    const callback = this.onRequestCallback(app, framework);

    http(this.name, callback);

    return callback;
  }

  //#endregion
}

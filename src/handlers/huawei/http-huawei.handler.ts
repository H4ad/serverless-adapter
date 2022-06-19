//#region Imports

import * as http from 'http';
import { RequestListener } from 'http';
import { BinarySettings } from '../../@types';
import {
  AdapterContract,
  FrameworkContract,
  HandlerContract,
  ResolverContract,
  ServerlessHandler,
} from '../../contracts';
import { ILogger, getDefaultIfUndefined } from '../../core';

//#endregion

/**
 * The default port that huawei will proxy the request to your framework
 *
 * {@link https://support.huaweicloud.com/intl/en-us/ae-ad-1-usermanual-functiongraph/functiongraph_01_1442.html#functiongraph_01_1442__li194597302096 | Reference}
 *
 * @breadcrumb Handlers / HttpHuaweiHandler
 * @public
 */
export const DEFAULT_HUAWEI_LISTEN_PORT: number = 8000;

/**
 * The options to customize {@link HttpHuaweiHandler}
 *
 * @breadcrumb Handlers / HttpHuaweiHandler
 * @public
 */
export type HttpHuaweiHandlerOptions = {
  /**
   * @defaultValue {@link DEFAULT_HUAWEI_LISTEN_PORT}
   */
  port?: number;

  /**
   * The factory to create a http server to use to listen huawei requests
   */
  httpServerFactory?: (requestListener: RequestListener) => http.Server;
};

/**
 * The class that implements a huawei serverless handler with http function that exposes a http server in specific port.
 *
 * In this Handler, you don't need to specific resolver and adapter, so you can use DummyAdapter and DummyResolver instead.
 *
 * @see https://support.huaweicloud.com/intl/en-us/ae-ad-1-usermanual-functiongraph/functiongraph_01_1442.html#functiongraph_01_1442__li194597302096
 *
 * @breadcrumb Handlers / HttpHuaweiHandler
 * @public
 */
export class HttpHuaweiHandler<TApp>
  implements HandlerContract<TApp, void, void, void, void, Promise<void>>
{
  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(protected readonly options?: HttpHuaweiHandlerOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
    _: AdapterContract<void, void, void>[],
    __: ResolverContract<void, void, void, void, void>,
    binarySettings: BinarySettings,
    respondWithErrors: boolean,
    log: ILogger,
  ): ServerlessHandler<Promise<void>> {
    const requestListener: RequestListener = (req, res) => {
      framework.sendRequest(app, req, res);
    };

    const server = getDefaultIfUndefined(
      this.options?.httpServerFactory,
      this.createHttpServer.bind(this),
    )(requestListener);

    const port = getDefaultIfUndefined(
      this.options?.port,
      DEFAULT_HUAWEI_LISTEN_PORT,
    );

    server.listen(port, () => {
      log.debug('SERVERLESS_ADAPTER:PROXY: Server started.');
      log.debug(
        `SERVERLESS_ADAPTER:PROXY: Listening the Huawei Requests in port ${port}`,
      );
    });

    return () => {
      log.debug('SERVERLESS_ADAPTER:PROXY: Disposing the server');

      return new Promise((resolve, reject) => {
        server.close(err => (err ? reject(err) : resolve()));
      });
    };
  }

  //#endregion

  //#region Protected Methods

  /**
   * The method that creates the instance of http server
   *
   * @param requestListener - O método que lidará com as requisições recebidas
   */
  protected createHttpServer(requestListener: RequestListener): http.Server {
    return http.createServer(requestListener);
  }

  //#endregion
}

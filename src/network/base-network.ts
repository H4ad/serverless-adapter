import type { NetworkContract } from '../contracts';
import { ServerlessRequest, type ServerlessRequestProps } from './request';
import { ServerlessResponse } from './response';

/**
 * Options for {@link DefaultNetwork}.
 *
 * @breadcrumb Network / DefaultNetwork
 * @public
 */
export interface DefaultNetworkOptions {
  /**
   * Whether created requests should define `request.ip` from the event source remote address.
   *
   * Disable this for frameworks that expose `ip` through their own request prototype.
   *
   * @defaultValue true
   */
  setRequestIp?: boolean;
}

/**
 * The default network implementation used to create framework request and response objects.
 *
 * @breadcrumb Network / DefaultNetwork
 * @public
 */
export class DefaultNetwork implements NetworkContract<
  ServerlessRequest,
  ServerlessResponse
> {
  constructor(private readonly options: DefaultNetworkOptions = {}) {}

  createRequest(props: ServerlessRequestProps): ServerlessRequest {
    return new ServerlessRequest({
      ...props,
      setIpProperty: this.options.setRequestIp ?? true,
    });
  }

  createResponse(props: { method?: string }): ServerlessResponse {
    return new ServerlessResponse(props);
  }

  getResponseBody(response: ServerlessResponse): Buffer {
    return ServerlessResponse.body(response);
  }

  getResponseHeaders(response: ServerlessResponse) {
    return ServerlessResponse.headers(response);
  }
}

/**
 * The default network implementation used to create framework request and response objects.
 *
 * @breadcrumb Network / DEFAULT_NETWORK
 * @public
 */
export const DEFAULT_NETWORK: NetworkContract<
  ServerlessRequest,
  ServerlessResponse
> = new DefaultNetwork();

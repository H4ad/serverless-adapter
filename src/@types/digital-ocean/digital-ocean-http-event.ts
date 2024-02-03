//#region Imports

import type { DigitalOceanHttpRootEvent } from '../http';

//#endregion

/**
 * The interface to represents the values of args send when someone calls a function using HTTP Endpoint.
 * To be able to receive this event, inside your `project.yml`, instead of `web: true` change to `web: 'raw'`.
 *
 * {@link https://www.digitalocean.com/community/questions/digitalocean-functions-how-to-differentiate-query-params-from-body-params | Reference}
 *
 * @public
 * @breadcrumb Types / Digital Ocean / DigitalOceanHttpEvent
 */
export interface DigitalOceanHttpEvent {
  /**
   * The HTTP Object of the request
   */
  http: DigitalOceanHttpRootEvent;

  /**
   * Any field of the request
   */
  [key: string]: any;
}

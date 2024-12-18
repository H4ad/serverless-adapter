// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http
import { IncomingMessage } from 'node:http';
import type { AddressInfo } from 'node:net';
import type { SingleValueHeaders } from '../@types';
import { NO_OP } from '../core';

const HTTPS_PORT = 443;

/**
 * The properties to create a {@link ServerlessRequest}
 *
 * @breadcrumb Network / ServerlessRequest
 * @public
 */
export interface ServerlessRequestProps {
  /**
   * The HTTP Method of the request
   */
  method: string;

  /**
   * The URL requested
   */
  url: string;

  /**
   * The headers from the event source
   */
  headers: SingleValueHeaders;

  /**
   * The body from the event source
   */
  body?: Buffer | Uint8Array;

  /**
   * The IP Address from caller
   */
  remoteAddress?: string;
}

/**
 * The class that represents an {@link http#IncomingMessage} created by the library to represent an actual request to the framework.
 *
 * @breadcrumb Network / ServerlessRequest
 * @public
 */
export class ServerlessRequest extends IncomingMessage {
  constructor({
    method,
    url,
    headers,
    body,
    remoteAddress,
  }: ServerlessRequestProps) {
    super({
      encrypted: true,
      readable: true, // credits to @pnkp at https://github.com/CodeGenieApp/serverless-express/pull/692
      remoteAddress,
      address: () => ({ port: HTTPS_PORT }) as AddressInfo,
      on: NO_OP,
      removeListener: NO_OP,
      removeEventListener: NO_OP,
      end: NO_OP,
      destroy: NO_OP,
    } as any);

    this.statusCode = 200;
    this.statusMessage = 'OK';
    this.complete = true;
    this.httpVersion = '1.1';
    this.httpVersionMajor = 1;
    this.httpVersionMinor = 1;
    this.method = method;
    this.headers = headers;
    this.body = body;
    this.url = url;
    this.ip = remoteAddress;

    this._read = () => {
      this.push(body);
      this.push(null);
    };
  }

  ip?: string;
  body?: Buffer | Uint8Array;
}

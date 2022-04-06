// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http
import { IncomingMessage } from 'http';
import { AddressInfo } from 'net';
import { SingleValueHeaders } from '../@types';
import { NO_OP } from '../core';

const HTTPS_PORT = 443;

/**
 * The properties to create a {@link ServerlessRequest}
 *
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
  body?: Buffer;

  /**
   * The IP Address from caller
   */
  remoteAddress?: string;
}

/**
 * The class that represents an {@link http#IncomingMessage} created by the library to represent an actual request to the framework.
 *
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
      readable: false,
      remoteAddress,
      address: () => ({ port: HTTPS_PORT } as AddressInfo),
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
  body?: Buffer;
}

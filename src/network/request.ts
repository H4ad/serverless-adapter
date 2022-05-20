// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http
import { IncomingMessage } from 'http';
import { AddressInfo } from 'net';
import { SingleValueHeaders } from '../@types';
import { NO_OP } from '../core';

const HTTPS_PORT = 443;

export interface ServerlessRequestProps {
  method: string;
  url: string;
  headers: SingleValueHeaders;
  body?: Buffer;
  remoteAddress?: string;
}

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
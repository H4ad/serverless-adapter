// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http
import http from 'http';
import { AddressInfo } from 'net';
import { NO_OP } from '../utils/no-op';

const HTTPS_PORT = 443;

export interface ServerlessRequestProps {
  method: string;
  url: string;
  headers: unknown;
  body: unknown;
  remoteAddress?: string;
}

export class ServerlessRequest extends http.IncomingMessage {
  body: any;

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

    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: '1.1',
      httpVersionMajor: '1',
      httpVersionMinor: '1',
      method,
      headers,
      body,
      url,
    });

    this._read = () => {
      this.push(body);
      this.push(null);
    };
  }
}

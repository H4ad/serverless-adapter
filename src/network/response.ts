// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http
import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { NO_OP } from '../core';

const headerEnd = '\r\n\r\n';

const BODY = Symbol('Response body');
const HEADERS = Symbol('Response headers');

function getString(data: Buffer | string | unknown) {
  if (Buffer.isBuffer(data)) return data.toString('utf8');
  else if (typeof data === 'string') return data;
  else if (data instanceof Uint8Array) return new TextDecoder().decode(data);
  else throw new Error(`response.write() of unexpected type: ${typeof data}`);
}

function addData(stream: ServerlessResponse, data: Uint8Array | string) {
  if (
    Buffer.isBuffer(data) ||
    typeof data === 'string' ||
    data instanceof Uint8Array
  )
    stream[BODY].push(Buffer.from(data));
  else throw new Error(`response.write() of unexpected type: ${typeof data}`);
}

/**
 * The properties to create a {@link ServerlessResponse}.
 *
 * @breadcrumb Network / ServerlessResponse
 * @public
 */
export interface ServerlessResponseProps {
  /**
   * The HTTP Method from request
   */
  method?: string;
}

/**
 * The class that represents a response instance used to send to the framework and wait until the framework finishes processing the request.
 * Once it's happens, we use the properties from this response to built the response to the cloud.
 *
 * @breadcrumb Network / ServerlessResponse
 * @public
 */
export class ServerlessResponse extends ServerResponse {
  constructor({ method }: ServerlessResponseProps) {
    super({ method } as any);

    this[BODY] = [];
    this[HEADERS] = {};

    this.useChunkedEncodingByDefault = false;
    this.chunkedEncoding = false;
    this._header = '';

    const socket: Partial<Socket> & { _writableState: any } = {
      _writableState: {},
      writable: true,
      on: NO_OP,
      removeListener: NO_OP,
      destroy: NO_OP,
      cork: NO_OP,
      uncork: NO_OP,
      write: (
        data: Uint8Array | string,
        encoding?: string | null | (() => void),
        cb?: () => void,
      ): any => {
        if (typeof encoding === 'function') {
          cb = encoding;
          encoding = null;
        }

        if (this._header === '' || this._wroteHeader) addData(this, data);
        else {
          const string = getString(data);
          const index = string.indexOf(headerEnd);

          if (index !== -1) {
            const remainder = string.slice(index + headerEnd.length);

            if (remainder) addData(this, remainder);

            this._wroteHeader = true;
          }
        }

        if (typeof cb === 'function') cb();
      },
    };

    this.assignSocket(socket as unknown as Socket);
  }

  _header: string;
  _headers?: Record<any, any>;
  _wroteHeader?: boolean;

  [BODY]: any[];
  [HEADERS]: Record<any, any>;

  get headers(): Record<any, any> {
    return this[HEADERS];
  }

  static from(res: IncomingMessage) {
    const response = new ServerlessResponse({ method: res.method });

    response.statusCode = res.statusCode || 0;
    response[HEADERS] = res.headers;
    response[BODY] = (res as any).body ? [Buffer.from((res as any).body)] : [];
    response.end();

    return response;
  }

  static body(res: ServerlessResponse): Buffer {
    return Buffer.concat(res[BODY]);
  }

  static headers(res: ServerlessResponse) {
    const headers = res.getHeaders();

    return Object.assign(headers, res[HEADERS]);
  }

  setHeader(key: string, value: number | string | readonly string[]): any {
    if (this._wroteHeader) this[HEADERS][key] = value;
    else super.setHeader(key, value);
  }

  writeHead(
    statusCode: number,
    statusMessage?: string | any | any[],
    obj?: any | any[],
  ): any {
    const headersObjOrArray =
      typeof statusMessage === 'string' ? obj : statusMessage;

    const arrayHeaders = Array.isArray(headersObjOrArray)
      ? headersObjOrArray
      : [headersObjOrArray || {}];

    for (const headers of arrayHeaders) {
      for (const name in headers) {
        this.setHeader(name, headers[name]!);

        if (!this._wroteHeader) {
          // we only need to initiate super.headers once
          // writeHead will add the other headers itself
          break;
        }
      }
    }

    return this.callNativeWriteHead(statusCode, statusMessage, obj);
  }

  /**
   * I use ignore here because in nodejs 12.x, statusMessage can be string | OutgoingHttpHeaders
   * But in nodejs \>=14.x, statusMessage can also be OutgoingHttpHeaders[]
   * I take care of these cases above, but here I can't handle it well, so I give up
   * nodejs 12.x ref: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/v12/http.d.ts#L229
   * nodejs 14.x ref: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/v14/http.d.ts#L263
   */
  protected callNativeWriteHead(
    statusCode: number,
    statusMessage?: string | any | any[],
    obj?: any | any[],
  ): this {
    return super.writeHead(statusCode, statusMessage, obj);
  }
}

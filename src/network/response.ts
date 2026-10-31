// ATTRIBUTION: https://github.com/dougmoscrop/serverless-http
import { IncomingMessage, ServerResponse } from 'node:http';
import type { Socket } from 'node:net';
import { ChunkedBodyDecoder, asBufferView, toBodyBuffer } from './body';
import { createSocketShim } from './socket';

const headerEnd = Buffer.from('\r\n\r\n');
const headerEndString = '\r\n\r\n';

const BODY = Symbol('Response body');
const HEADERS = Symbol('Response headers');

function addData(stream: ServerlessResponse, data: unknown) {
  stream[BODY].push(toBodyBuffer(data));
}

// The decoder allocates its output, so it can be stored without another copy.
function addOwnedData(stream: ServerlessResponse, data: Buffer) {
  stream[BODY].push(data);
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

    // Node frames a chunked body as hex length, CRLF, data, CRLF, ending with
    // 0\r\n\r\n. Since Node 24.22 and 26.9 it corks the message and flushes
    // every chunk of a tick as one frame (nodejs/node#64987), so the number of
    // socket writes no longer matches the number of res.write calls. Decode the
    // framing by length instead of counting writes.
    const decoder = new ChunkedBodyDecoder();

    const writeBody = (data: unknown) => {
      if (!this.chunkedEncoding) {
        addData(this, data);
        return;
      }

      for (const chunk of decoder.push(asBufferView(data)))
        addOwnedData(this, chunk);
    };

    const socket = createSocketShim((data, _encoding, cb) => {
      if (this._header === '' || this._wroteHeader) writeBody(data);
      else {
        // Node prefixes the headers to the first body write, which includes the
        // first chunk size when the response is chunked. Find the boundary in
        // the bytes instead of converting the whole write to a string.
        let remainder: string | Buffer | null = null;

        if (typeof data === 'string') {
          const index = data.indexOf(headerEndString);

          if (index !== -1)
            remainder = data.slice(index + headerEndString.length);
        } else {
          const buffer = asBufferView(data);
          const index = buffer.indexOf(headerEnd);

          if (index !== -1)
            remainder = buffer.subarray(index + headerEnd.length);
        }

        if (remainder !== null) {
          if (remainder.length > 0) writeBody(remainder);

          this._wroteHeader = true;
        }
      }

      if (typeof cb === 'function') cb();

      return true;
    });

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
    // The decoder hands over buffers it owns, and a chunk is never written to
    // twice, so a single collected chunk can be returned without another copy.
    if (res[BODY].length === 1) return res[BODY][0];

    return Buffer.concat(res[BODY]);
  }

  static headers(res: ServerlessResponse) {
    const headers = res.getHeaders();

    return Object.assign(headers, res[HEADERS]);
  }

  override setHeader(
    key: string,
    value: number | string | readonly string[],
  ): any {
    if (this._wroteHeader) this[HEADERS][key] = value;
    else super.setHeader(key, value);
  }

  override writeHead(
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

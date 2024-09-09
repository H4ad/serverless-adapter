import { ServerResponse } from 'node:http';
import type { Socket } from 'node:net';
import type { Writable } from 'node:stream';
import type { BothValueHeaders } from '../@types';
import { type ILogger, NO_OP, parseHeaders } from '../core';
import { getString } from './utils';

// header or data crlf
const crlfBuffer = Buffer.from('\r\n');

const endChunked = '0\r\n\r\n';
const headerEnd = '\r\n\r\n';
const endStatusSeparator = '\r\n';

/**
 * The properties to create a {@link ServerlessStreamResponse}.
 *
 * @breadcrumb Network / ServerlessStreamResponse
 * @public
 */
export interface ServerlessStreamResponseProps {
  /**
   * The HTTP Method from request
   */
  method?: string;

  /**
   * The callback to receive the headers when they are written to the stream
   * You need to return a writable stream be able to continue writing the response
   *
   * @param statusCode - The status code of the response
   * @param headers - The headers of the response
   */
  onReceiveHeaders: (statusCode: number, headers: BothValueHeaders) => Writable;

  /**
   * Instance of the logger
   */
  log: ILogger;
}

/**
 * The class that represents a response instance used to send to the framework and wait until the framework finishes processing the request.
 * This response is specially built to deal with transfer-encoding: chunked
 *
 * @breadcrumb Network / ServerlessStreamResponse
 * @public
 */
export class ServerlessStreamResponse extends ServerResponse {
  constructor({
    method,
    onReceiveHeaders,
    log,
  }: ServerlessStreamResponseProps) {
    super({ method } as any);

    this.useChunkedEncodingByDefault = true;
    this.chunkedEncoding = true;

    let internalWritable: Writable | null = null;
    let firstCrlfBufferEncountered = false;
    let chunkEncountered = false;

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
        // very unlikely, I don't even know how to reproduce this, but exist on types
        // istanbul ignore if
        if (typeof encoding === 'function') {
          cb = encoding;
          encoding = null;
        }

        log.debug('SERVERLESS_ADAPTER:RESPONSE_STREAM:DATA', () => ({
          data: Buffer.isBuffer(data) ? data.toString('utf8') : data,
          encoding,
        }));

        if (!internalWritable) {
          const stringData = getString(data);
          const endStatusIndex = stringData.indexOf(endStatusSeparator);
          const status = +stringData.slice(0, endStatusIndex).split(' ')[1];
          const endHeaderIndex = stringData.indexOf(headerEnd);

          const headerData = stringData.slice(
            endStatusIndex + 2,
            endHeaderIndex,
          );
          const headers = parseHeaders(headerData);
          log.debug(
            'SERVERLESS_ADAPTER:RESPONSE_STREAM:FRAMEWORK_HEADERS',
            () => ({
              headers,
            }),
          );

          internalWritable = onReceiveHeaders(status, headers);

          // If we get an endChunked right after header which means the response body is empty, we need to immediately end the writable
          if (stringData.substring(endHeaderIndex + 4) === endChunked)
            internalWritable.end();

          return true;
        }

        // node sends the last chunk crlf as a string:
        // https://github.com/nodejs/node/blob/v22.8.0/lib/_http_outgoing.js#L1131
        if (data === endChunked) {
          internalWritable.end(cb);
          return true;
        }

        // check for header or data crlf
        // node sends the header and data crlf as a buffer
        // below code is aligned to following node implementation of the HTTP/1.1 chunked transfer coding:
        // https://github.com/nodejs/node/blob/v22.8.0/lib/_http_outgoing.js#L1012-L1015
        // for reference: https://datatracker.ietf.org/doc/html/rfc9112#section-7
        if (Buffer.isBuffer(data) && crlfBuffer.equals(data)) {
          const isHeaderCrlf = !firstCrlfBufferEncountered;
          if (isHeaderCrlf) {
            firstCrlfBufferEncountered = true;
            return true;
          }

          const isDataCrlf = firstCrlfBufferEncountered && chunkEncountered;
          if (isDataCrlf) {
            // done with chunk
            firstCrlfBufferEncountered = false;
            chunkEncountered = false;
            return true;
          }

          // the crlf *is* the chunk
        }

        const isContentLength = !firstCrlfBufferEncountered;
        if (isContentLength) {
          // discard content length
          return true;
        }

        // write chunk
        chunkEncountered = true;
        internalWritable.write(data, cb);
        return true;
      },
    };

    this.assignSocket(socket as unknown as Socket);
  }
}

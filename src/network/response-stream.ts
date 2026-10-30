import { ServerResponse } from 'node:http';
import type { Socket } from 'node:net';
import type { Writable } from 'node:stream';
import type { BothValueHeaders } from '../@types';
import { type ILogger, parseHeaders } from '../core';
import { ChunkedBodyDecoder, toBodyBuffer } from './body';
import { createSocketShim } from './socket';
import { getString } from './utils';

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

    // Node frames a chunked body as hex length, CRLF, data, CRLF, ending with
    // 0\r\n\r\n. Since Node 24.22 and 26.9 it corks the message and flushes
    // every chunk of a tick as one frame (nodejs/node#64987), so the number of
    // socket writes no longer matches the number of res.write calls. Decode the
    // framing by length instead of counting writes.
    const decoder = new ChunkedBodyDecoder();

    let internalWritable: Writable | null = null;
    let lastAccepted = true;
    let draining = false;

    // The internal writable is the real sink, so its backpressure has to reach
    // the caller of res.write(). The fake socket cannot emit `drain` itself,
    // so the event is forwarded when the internal writable drains.
    const forwardDrain = () => {
      if (draining || !internalWritable) return;

      draining = true;

      internalWritable.once('drain', () => {
        draining = false;

        if (!this.destroyed && !this.writableEnded) this.emit('drain');
      });
    };

    const writeBody = (data: Buffer, cb?: () => void): boolean => {
      const chunks = this.chunkedEncoding
        ? decoder.push(data)
        : data.length > 0
          ? [data]
          : [];

      for (const chunk of chunks)
        lastAccepted = internalWritable!.write(chunk) as boolean;

      if (decoder.ended) {
        if (typeof cb === 'function') internalWritable!.end(cb);
        else internalWritable!.end();

        return lastAccepted;
      }

      if (typeof cb === 'function') process.nextTick(cb);

      if (!lastAccepted) forwardDrain();

      return lastAccepted;
    };

    const socket = createSocketShim((data, encoding, cb) => {
      log.debug('SERVERLESS_ADAPTER:RESPONSE_STREAM:DATA', () => ({
        data: Buffer.isBuffer(data) ? data.toString('utf8') : data,
        encoding,
      }));

      if (!internalWritable) {
        const stringData = getString(data);
        const endStatusIndex = stringData.indexOf(endStatusSeparator);
        const status = +stringData.slice(0, endStatusIndex).split(' ')[1];
        const endHeaderIndex = stringData.indexOf(headerEnd);

        const headerData = stringData.slice(endStatusIndex + 2, endHeaderIndex);
        const headers = parseHeaders(headerData);
        log.debug(
          'SERVERLESS_ADAPTER:RESPONSE_STREAM:FRAMEWORK_HEADERS',
          () => ({
            headers,
          }),
        );

        internalWritable = onReceiveHeaders(status, headers);

        // Node prefixes the headers to the first body write, which includes the
        // first chunk size when the response is chunked.
        const dataAfterHeaders = stringData.substring(endHeaderIndex + 4);

        // Responses without a body (eg. 204) write only the headers and never
        // write again, so the callback has to be called here or the response
        // never emits `finish`.
        if (dataAfterHeaders === '') {
          if (typeof cb === 'function') process.nextTick(cb);

          return true;
        }

        // An empty chunked body arrives as 0\r\n\r\n right after the headers,
        // and the decoder ends the writable.
        return writeBody(Buffer.from(dataAfterHeaders), cb);
      }

      return writeBody(toBodyBuffer(data), cb);
    });

    this.assignSocket(socket as unknown as Socket);
  }
}

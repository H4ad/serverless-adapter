import { ServerResponse } from 'node:http';
import type { Socket } from 'node:net';
import type { Writable } from 'node:stream';
import type { BothValueHeaders } from '../@types';
import { type ILogger, NO_OP, parseHeaders } from '../core';
import { ChunkedBodyDecoder, asBufferView, toBodyBuffer } from './body';
import { createSocketShim } from './socket';

const headerEnd = '\r\n\r\n';
const statusLineEnd = '\r\n';
const headerEndBuffer = Buffer.from(headerEnd);
const statusLineEndBuffer = Buffer.from(statusLineEnd);

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
    // The default logger maps disabled levels to NO_OP. Checking once avoids
    // building a closure object for every socket write of the response.
    const debugEnabled = log.debug !== NO_OP;

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

    const writeBody = (data: unknown, cb?: () => void): boolean => {
      let chunks: Buffer[];

      if (this.chunkedEncoding) chunks = decoder.push(asBufferView(data));
      else {
        // Not chunked: the bytes go to the sink as they are, so they have to be
        // copied before the caller can reuse the buffer it passed to write().
        const buffer = toBodyBuffer(data);

        chunks = buffer.length > 0 ? [buffer] : [];
      }

      const lastIndex = chunks.length - 1;

      for (let index = 0; index < lastIndex; index++)
        lastAccepted = internalWritable!.write(chunks[index]) as boolean;

      if (decoder.ended) {
        if (lastIndex >= 0)
          lastAccepted = internalWritable!.write(chunks[lastIndex]!) as boolean;

        if (typeof cb === 'function') internalWritable!.end(cb);
        else internalWritable!.end();

        return lastAccepted;
      }

      // Hand the socket write callback to the sink instead of scheduling a
      // nextTick per write. A response made of many small writes otherwise
      // queues one microtask per chunk for no reason.
      if (lastIndex >= 0) {
        lastAccepted = internalWritable!.write(
          chunks[lastIndex]!,
          cb,
        ) as boolean;
      } else if (typeof cb === 'function') process.nextTick(cb);

      if (!lastAccepted) forwardDrain();

      return lastAccepted;
    };

    const socket = createSocketShim((data, encoding, cb) => {
      if (debugEnabled) {
        log.debug('SERVERLESS_ADAPTER:RESPONSE_STREAM:DATA', () => ({
          data: Buffer.isBuffer(data) ? data.toString('utf8') : data,
          encoding,
        }));
      }

      if (!internalWritable) {
        // Parse the header block as it arrived. Turning a buffer into a string
        // would decode (and then re-encode) the first body chunk too, while a
        // string can be searched directly without any conversion.
        let endStatusIndex: number;
        let endHeaderIndex: number;
        let statusLine: string;
        let headerData: string;
        let dataAfterHeaders: string | Buffer;

        if (typeof data === 'string') {
          endStatusIndex = data.indexOf(statusLineEnd);
          endHeaderIndex = data.indexOf(headerEnd);
          statusLine = data.slice(0, endStatusIndex);
          headerData = data.slice(
            endStatusIndex + statusLineEnd.length,
            endHeaderIndex,
          );
          dataAfterHeaders = data.substring(endHeaderIndex + headerEnd.length);
        } else {
          const buffer = asBufferView(data);

          endStatusIndex = buffer.indexOf(statusLineEndBuffer);
          endHeaderIndex = buffer.indexOf(headerEndBuffer);
          statusLine = buffer.toString('latin1', 0, endStatusIndex);
          headerData = buffer.toString(
            'utf8',
            endStatusIndex + statusLineEndBuffer.length,
            endHeaderIndex,
          );
          dataAfterHeaders = buffer.subarray(
            endHeaderIndex + headerEndBuffer.length,
          );
        }

        const status = +statusLine.split(' ')[1]!;
        const headers = parseHeaders(headerData);

        if (debugEnabled) {
          log.debug(
            'SERVERLESS_ADAPTER:RESPONSE_STREAM:FRAMEWORK_HEADERS',
            () => ({
              headers,
            }),
          );
        }

        internalWritable = onReceiveHeaders(status, headers);

        // Responses without a body (eg. 204) write only the headers and never
        // write again, so the callback has to be called here or the response
        // never emits `finish`.
        if (dataAfterHeaders.length === 0) {
          if (typeof cb === 'function') process.nextTick(cb);

          return true;
        }

        // An empty chunked body arrives as 0\r\n\r\n right after the headers,
        // and the decoder ends the writable.
        return writeBody(dataAfterHeaders, cb);
      }

      return writeBody(data, cb);
    });

    this.assignSocket(socket as unknown as Socket);
  }
}

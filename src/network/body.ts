const CRLF = Buffer.from('\r\n');

type DecoderState = 'size' | 'data' | 'terminator' | 'done';

function parseSize(header: Buffer): number {
  // A chunk extension starts at ';' and is not part of the length.
  const text = header.toString('latin1').split(';', 1)[0]!.trim();
  const size = Number.parseInt(text, 16);

  if (!Number.isFinite(size))
    throw new Error(`invalid chunk size in response body: "${text}"`);

  return size;
}

/**
 * Reads the HTTP/1.1 chunked transfer coding (RFC 9112 section 7.1) from the
 * bytes Node writes to the socket: hex length, CRLF, exactly that many bytes,
 * CRLF, repeated until a zero length.
 *
 * It has to decode by length because Node's socket writes are not aligned with
 * the framing. Up to Node 24.21 every `res.write()` produced its own frame, but
 * since 24.22.0 and 26.9.0 Node corks the message and flushes every chunk of a
 * tick as a single frame, so one socket write can start or end in the middle of
 * the framing.
 */
export class ChunkedBodyDecoder {
  private buffer = Buffer.alloc(0);
  private remaining = 0;
  private state: DecoderState = 'size';

  /**
   * True after the terminating zero-length chunk is read. Any trailer that
   * follows it is ignored, as it carries no body bytes.
   */
  get ended(): boolean {
    return this.state === 'done';
  }

  /**
   * Decode the next piece of the socket stream.
   *
   * @param data - The bytes written to the socket
   * @returns The body bytes contained in `data`, framing removed
   */
  push(data: Buffer): Buffer[] {
    if (data.length === 0) return [];

    this.buffer =
      this.buffer.length === 0 ? data : Buffer.concat([this.buffer, data]);

    const chunks: Buffer[] = [];

    for (;;) {
      if (this.state === 'done') break;

      if (this.state === 'size') {
        const end = this.buffer.indexOf(CRLF);

        if (end === -1) break;

        const size = parseSize(this.buffer.subarray(0, end));

        this.buffer = this.buffer.subarray(end + CRLF.length);

        if (size === 0) {
          this.state = 'done';
          break;
        }

        this.remaining = size;
        this.state = 'data';
        continue;
      }

      if (this.state === 'data') {
        if (this.buffer.length === 0) break;

        const take = Math.min(this.remaining, this.buffer.length);

        chunks.push(this.buffer.subarray(0, take));
        this.buffer = this.buffer.subarray(take);
        this.remaining -= take;

        if (this.remaining === 0) this.state = 'terminator';
        continue;
      }

      // terminator: the CRLF that closes the chunk data. It can be split
      // across two socket writes, so wait until both bytes have arrived.
      if (this.buffer.length < CRLF.length) break;

      this.buffer = this.buffer.subarray(CRLF.length);
      this.state = 'size';
    }

    return chunks;
  }
}

/**
 * Validate and copy the data written to the response. The copy keeps the
 * collected body stable when the caller reuses its buffer after `write()`.
 *
 * @param data - The data that was written to the response
 */
export function toBodyBuffer(data: unknown): Buffer {
  if (
    Buffer.isBuffer(data) ||
    typeof data === 'string' ||
    data instanceof Uint8Array
  )
    return Buffer.from(data);

  throw new Error(`response.write() of unexpected type: ${typeof data}`);
}

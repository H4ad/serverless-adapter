const CRLF = Buffer.from('\r\n');
const EMPTY = Buffer.alloc(0);

// Allocating the announced chunk size up front lets one HTTP chunk that is
// flushed over many socket writes come out as a single owned buffer. Beyond
// this bound the size is not trusted enough to allocate in one go, so the
// decoder falls back to per-write parts joined at the end of the chunk.
const MAX_DIRECT_ALLOCATION = 16 * 1024 * 1024;

type DecoderState = 'size' | 'data' | 'terminator' | 'done';

/**
 * Parse the hex chunk size without allocating a string per chunk.
 *
 * It follows `Number.parseInt(value, 16)` closely enough for a chunk header:
 * leading whitespace is skipped and parsing stops at the first byte that is not
 * a hex digit, so a chunk extension (`;name=value`) is ignored.
 */
function parseSize(buffer: Buffer, start: number, end: number): number {
  let index = start;

  while (index < end && (buffer[index] === 0x20 || buffer[index] === 0x09))
    index++;

  let size = 0;
  let digits = 0;

  for (; index < end; index++) {
    const byte = buffer[index]!;
    let digit: number;

    if (byte >= 0x30 && byte <= 0x39) digit = byte - 0x30;
    else if (byte >= 0x41 && byte <= 0x46) digit = byte - 0x37;
    else if (byte >= 0x61 && byte <= 0x66) digit = byte - 0x57;
    else break;

    size = size * 16 + digit;
    digits++;
  }

  if (digits === 0) {
    throw new Error(
      `invalid chunk size in response body: "${buffer.toString('latin1', start, end)}"`,
    );
  }

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
  private buffer = EMPTY;
  /**
   * Read cursor. The bytes before it were already consumed and are kept only
   * because slicing the buffer per chunk would allocate a view on every step.
   */
  private start = 0;
  private remaining = 0;
  private state: DecoderState = 'size';
  /** Output of the chunk currently being read, sized by its header. */
  private chunkOutput: Buffer | null = null;
  private chunkOffset = 0;
  /** Fallback for a chunk too large to allocate from its header alone. */
  private chunkParts: Buffer[] | null = null;

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
   * @returns The body of every chunk completed by this write. A chunk split
   * across writes is buffered until its last byte arrives, then returned as one
   * buffer owned by the decoder, so a caller may retain it after the write
   * returns.
   */
  push(data: Buffer): Buffer[] {
    if (this.state === 'done' || data.length === 0) return [];

    if (this.start === this.buffer.length) {
      // Nothing pending: decode this write in place, without a copy.
      this.buffer = data;
      this.start = 0;
    } else {
      this.buffer = Buffer.concat([this.buffer.subarray(this.start), data]);
      this.start = 0;
    }

    const buffer = this.buffer;
    const chunks: Buffer[] = [];

    for (;;) {
      if (this.state === 'size') {
        const end = buffer.indexOf(CRLF, this.start);

        if (end === -1) break;

        const size = parseSize(buffer, this.start, end);

        this.start = end + CRLF.length;

        if (size === 0) {
          this.state = 'done';
          break;
        }

        this.remaining = size;
        this.state = 'data';
        this.chunkOffset = 0;
        this.chunkParts = null;
        this.chunkOutput =
          size <= MAX_DIRECT_ALLOCATION ? Buffer.allocUnsafe(size) : null;
        continue;
      }

      if (this.state === 'data') {
        const available = buffer.length - this.start;

        if (available === 0) break;

        const take = this.remaining < available ? this.remaining : available;

        // Copy the body out now. The bytes Node passes in are the caller's
        // buffers, which may be reused as soon as `write()` returns, while the
        // body has to stay stable until the response ends.
        if (this.chunkOutput) {
          buffer.copy(
            this.chunkOutput,
            this.chunkOffset,
            this.start,
            this.start + take,
          );
          this.chunkOffset += take;
        } else {
          const part = Buffer.allocUnsafe(take);

          buffer.copy(part, 0, this.start, this.start + take);
          (this.chunkParts ??= []).push(part);
        }

        this.start += take;
        this.remaining -= take;

        if (this.remaining === 0) {
          this.state = 'terminator';

          // One buffer per HTTP chunk, however many socket writes it took.
          const parts = this.chunkParts;

          chunks.push(
            this.chunkOutput ??
              (parts!.length === 1 ? parts![0]! : Buffer.concat(parts!)),
          );
          this.chunkOutput = null;
          this.chunkParts = null;
        }

        continue;
      }

      // terminator: the CRLF that closes the chunk data. It can be split
      // across two socket writes, so wait until both bytes have arrived.
      if (buffer.length - this.start < CRLF.length) break;

      this.start += CRLF.length;
      this.state = 'size';
    }

    if (this.start === buffer.length) {
      this.buffer = EMPTY;
      this.start = 0;
    }

    return chunks;
  }
}

/**
 * Read the data written to the response without copying it. The returned
 * buffer is only valid until the socket write returns; callers must copy any
 * slice they keep, as {@link ChunkedBodyDecoder} does for the response body.
 *
 * @param data - The data that was written to the response
 */
export function asBufferView(data: unknown): Buffer {
  if (Buffer.isBuffer(data)) return data;

  if (typeof data === 'string') return Buffer.from(data);

  if (data instanceof Uint8Array)
    return Buffer.from(data.buffer, data.byteOffset, data.byteLength);

  throw new Error(`response.write() of unexpected type: ${typeof data}`);
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

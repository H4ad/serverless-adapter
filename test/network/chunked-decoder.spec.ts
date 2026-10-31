import { describe, expect, it } from 'vitest';
import { ChunkedBodyDecoder } from '../../src/network/body';

const CRLF = '\r\n';
const endChunk = Buffer.from('0\r\n\r\n');

function frame(...chunks: string[]): Buffer {
  return Buffer.concat(
    chunks.map(chunk =>
      Buffer.concat([
        Buffer.from(chunk.length.toString(16)),
        Buffer.from(CRLF),
        Buffer.from(chunk),
        Buffer.from(CRLF),
      ]),
    ),
  );
}

function decode(...pushes: Buffer[]): { body: string; ended: boolean } {
  const decoder = new ChunkedBodyDecoder();
  const chunks: Buffer[] = [];

  for (const push of pushes) chunks.push(...decoder.push(push));

  return { body: Buffer.concat(chunks).toString(), ended: decoder.ended };
}

describe('ChunkedBodyDecoder', () => {
  it('should decode a chunk written in its own frame', () => {
    expect(decode(frame('hello'), endChunk)).toEqual({
      body: 'hello',
      ended: true,
    });
  });

  it('should decode the frame Node flushes for a batch of writes', () => {
    // Node 24.22+ flushes every chunk of a tick as one frame: total length,
    // CRLF, each chunk, CRLF. Here one frame holds "abc" as three writes.
    const flush = Buffer.concat([
      Buffer.from('3'),
      Buffer.from(CRLF),
      Buffer.from('a'),
      Buffer.from('b'),
      Buffer.from('c'),
      Buffer.from(CRLF),
    ]);

    expect(decode(flush, endChunk)).toEqual({ body: 'abc', ended: true });
  });

  it('should decode a frame split at any byte boundary', () => {
    const raw = Buffer.concat([frame('hello'), frame(' '), frame('world')]);

    for (let index = 0; index <= raw.length; index++) {
      const decoder = new ChunkedBodyDecoder();
      const chunks = [
        ...decoder.push(raw.subarray(0, index)),
        ...decoder.push(raw.subarray(index)),
        ...decoder.push(endChunk),
      ];

      expect(Buffer.concat(chunks).toString()).toBe('hello world');
      expect(decoder.ended).toBe(true);
    }
  });

  it('should decode one byte at a time', () => {
    const raw = Buffer.concat([frame('abc'), endChunk]);
    const decoder = new ChunkedBodyDecoder();
    const chunks: Buffer[] = [];

    for (const byte of raw) chunks.push(...decoder.push(Buffer.from([byte])));

    expect(Buffer.concat(chunks).toString()).toBe('abc');
  });

  it('should keep a chunk that is only a CRLF', () => {
    expect(decode(frame('\r\n'), frame('a'), endChunk)).toEqual({
      body: '\r\na',
      ended: true,
    });
  });

  it('should ignore a chunk extension', () => {
    const raw = Buffer.from('5;foo=bar\r\nhello\r\n');

    expect(decode(raw, endChunk)).toEqual({ body: 'hello', ended: true });
  });

  it('should stop at the zero length chunk and ignore trailers', () => {
    const raw = Buffer.from('0\r\nX-Checksum: 1\r\n\r\n');

    expect(decode(raw)).toEqual({ body: '', ended: true });
  });

  it('should return nothing after the body ended', () => {
    const decoder = new ChunkedBodyDecoder();

    decoder.push(endChunk);

    expect(decoder.push(Buffer.from('extra'))).toEqual([]);
  });

  it('should throw on an invalid chunk size', () => {
    const decoder = new ChunkedBodyDecoder();

    expect(() => decoder.push(Buffer.from('zz\r\n'))).toThrowError(
      'invalid chunk size',
    );
  });

  it('should skip leading whitespace and read lowercase hex sizes', () => {
    const raw = Buffer.from(' \ta\r\n0123456789\r\n');

    expect(decode(raw, endChunk)).toEqual({ body: '0123456789', ended: true });
  });

  it('should read uppercase hex sizes', () => {
    const raw = Buffer.from('A\r\n0123456789\r\n');

    expect(decode(raw, endChunk)).toEqual({ body: '0123456789', ended: true });
  });

  it('should throw when the size starts with a non hex character', () => {
    const decoder = new ChunkedBodyDecoder();

    expect(() => decoder.push(Buffer.from('-\r\n'))).toThrowError(
      'invalid chunk size',
    );
  });

  it('should assemble a chunk larger than the direct allocation limit', () => {
    const size = 16 * 1024 * 1024 + 1;
    const payload = Buffer.alloc(size, 0x61);
    const header = Buffer.from(`${size.toString(16)}\r\n`);
    const crlf = Buffer.from(CRLF);
    const decoder = new ChunkedBodyDecoder();

    // one big chunk delivered in a single write: a single allocated part
    const single = decoder.push(Buffer.concat([header, payload, crlf]));

    expect(Buffer.concat(single)).toHaveLength(size);

    // one big chunk delivered across writes: the parts are joined at the end
    expect(decoder.push(header)).toEqual([]);

    const half = Math.floor(size / 2);

    expect(decoder.push(payload.subarray(0, half))).toEqual([]);

    const rest = decoder.push(
      Buffer.concat([payload.subarray(half), crlf, endChunk]),
    );

    expect(Buffer.concat(rest)).toHaveLength(size);
    expect(rest).toHaveLength(1);
    expect(decoder.ended).toBe(true);
  });
});

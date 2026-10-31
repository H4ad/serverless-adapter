import { once } from 'node:events';
import { Writable, getDefaultHighWaterMark } from 'node:stream';
import { describe, expect, it, vitest } from 'vitest';
import { ServerlessStreamResponse } from '../../src';

const log = {
  debug: vitest.fn(),
  verbose: vitest.fn(),
  info: vitest.fn(),
  warn: vitest.fn(),
  error: vitest.fn(),
};

function createResponse(onWrite?: Writable) {
  const received: Buffer[] = [];

  const response = new ServerlessStreamResponse({
    method: 'GET',
    onReceiveHeaders: () =>
      onWrite ??
      new Writable({
        write(chunk, _encoding, callback) {
          received.push(Buffer.from(chunk));
          callback();
        },
      }),
    log,
  });

  response.statusCode = 200;

  return {
    response,
    body: () => Buffer.concat(received).toString(),
  };
}

function writeWithCallback(
  response: ServerlessStreamResponse,
  chunk: string | Buffer,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error('write callback was not called')),
      1000,
    );

    response.write(chunk, () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

describe('ServerlessStreamResponse', () => {
  // Node 24.22+ and 26.9+ cork the message itself and flush one frame per
  // tick, so the number of socket writes no longer matches the number of
  // res.write calls. The shim must decode the framing by length instead of
  // counting socket writes.
  it('should keep every chunk written in the same tick', async () => {
    const { response, body } = createResponse();

    response.write('a');
    response.write('b');
    response.write('c');
    response.end();

    await once(response, 'finish');

    expect(body()).toBe('abc');
  });

  it('should keep chunks written across ticks', async () => {
    const { response, body } = createResponse();

    response.write('a');
    response.write('b');
    await new Promise(resolve => setImmediate(resolve));
    response.write('c');
    response.end('d');

    await once(response, 'finish');

    expect(body()).toBe('abcd');
  });

  it('should keep a Buffer CRLF chunk between data chunks', async () => {
    const { response, body } = createResponse();

    response.write(Buffer.from('a'));
    response.write(Buffer.from('\r\n'));
    response.write(Buffer.from('b'));
    response.end();

    await once(response, 'finish');

    expect(body()).toBe('a\r\nb');
  });

  it('should keep a trailing Buffer CRLF chunk', async () => {
    const { response, body } = createResponse();

    response.write(Buffer.from('a'));
    response.write(Buffer.from('\r\n'));
    response.end();

    await once(response, 'finish');

    expect(body()).toBe('a\r\n');
  });

  it('should keep a string CRLF chunk', async () => {
    const { response, body } = createResponse();

    response.write(Buffer.from('a'));
    response.write('\r\n');
    response.write(Buffer.from('b'));
    response.end();

    await once(response, 'finish');

    expect(body()).toBe('a\r\nb');
  });

  it('should call the write callback', async () => {
    const { response } = createResponse();

    await writeWithCallback(response, 'hello');

    response.end();

    await once(response, 'finish');
  });

  it('should call the callback of every write in the same tick', async () => {
    const { response } = createResponse();

    await Promise.all([
      writeWithCallback(response, 'a'),
      writeWithCallback(response, 'b'),
      writeWithCallback(response, 'c'),
    ]);

    response.end();

    await once(response, 'finish');
  });

  it('should expose the writable metadata Node reads from the socket', () => {
    const { response } = createResponse();

    expect(response.writableLength).toBe(0);
    expect(response.writableHighWaterMark).toBe(getDefaultHighWaterMark(false));
  });

  it('should accept a write above 16 KiB without backpressure', () => {
    const { response } = createResponse();

    expect(response.write(Buffer.alloc(20 * 1024, 'a'))).toBe(true);
  });

  it('should emit drain when the internal writable drains', async () => {
    let release: (() => void) | undefined;

    const internal = new Writable({
      highWaterMark: 1,
      write(_chunk, _encoding, callback) {
        release = () => callback();
      },
    });

    const { response } = createResponse(internal);

    response.write('hello');

    const drained = once(response, 'drain');

    // 24.22+ flushes the frame on the next tick, so the internal write that
    // reports backpressure happens after res.write returns.
    await new Promise(resolve => setImmediate(resolve));

    release!();

    await drained;
  });

  it('should forward the body when the response is not chunked', async () => {
    const { response, body } = createResponse();

    // only a response with a body restriction such as 204 turns the flag off
    // by itself, and Node drops the body in that case
    response.flushHeaders();
    (response as any).chunkedEncoding = false;

    (response as any).socket.write(Buffer.alloc(0));
    response.write('hello');
    response.end();

    await once(response, 'finish');

    expect(body()).toBe('hello');
  });

  describe('socket writes', () => {
    function createSocketResponse() {
      const received: Buffer[] = [];

      const sink = new Writable({
        write(chunk, _encoding, callback) {
          received.push(Buffer.from(chunk));
          callback();
        },
      });

      const onReceiveHeaders = vitest.fn(() => sink);

      const response = new ServerlessStreamResponse({
        method: 'GET',
        onReceiveHeaders,
        log,
      });

      return {
        socket: (response as any).socket,
        onReceiveHeaders,
        sink,
        body: () => Buffer.concat(received).toString(),
      };
    }

    it('should write every chunk completed by one socket write', () => {
      const { socket, body } = createSocketResponse();

      socket.write('HTTP/1.1 200 OK\r\n\r\n');
      socket.write(Buffer.from('5\r\nhello\r\n5\r\nworld\r\n0\r\n\r\n'));

      expect(body()).toBe('helloworld');
    });

    it('should end the sink when the last chunk arrives on its own', async () => {
      const { socket, sink, body } = createSocketResponse();

      socket.write('HTTP/1.1 200 OK\r\n\r\n');
      socket.write(Buffer.from('5\r\nhello\r\n'));
      socket.write(Buffer.from('0\r\n\r\n'));

      await once(sink, 'finish');

      expect(body()).toBe('hello');
    });

    it('should parse a header block written as a buffer', () => {
      const { socket, onReceiveHeaders, body } = createSocketResponse();

      socket.write(
        Buffer.from('HTTP/1.1 204 No Content\r\nx-test: yes\r\n\r\n'),
      );

      expect(onReceiveHeaders).toHaveBeenCalledWith(204, { 'x-test': 'yes' });

      socket.write(Buffer.from('0\r\n\r\n'));

      expect(body()).toBe('');
    });
  });
});

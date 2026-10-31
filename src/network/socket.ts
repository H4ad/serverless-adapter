import type { Socket } from 'node:net';
import { getDefaultHighWaterMark } from 'node:stream';
import { NO_OP } from '../core';

/**
 * Writes the bytes Node sends to the response to their destination.
 *
 * @returns Whether the destination accepted the bytes without backpressure
 */
export type SocketWrite = (
  data: string | Uint8Array,
  encoding: string | null,
  callback: (() => void) | undefined,
) => boolean;

export type SocketShim = Partial<Socket> & {
  _writableState: Record<string, any>;
};

/**
 * Builds the fake socket both response shims hand to `assignSocket`.
 *
 * The write callback is the only part that differs between the two shims, so
 * the Node compatibility properties live here exactly once.
 *
 * @param write - The handler that receives what Node writes to the socket
 */
export function createSocketShim(write: SocketWrite): SocketShim {
  return {
    _writableState: {},
    writable: true,
    // Node reads both of these from the socket. `writableLength` feeds
    // OutgoingMessage.writableLength, and `writableHighWaterMark` takes
    // precedence over the message default. Since 24.22.0 the corked chunked
    // path (nodejs/node#64987) compares them, and without them the value is NaN
    // so every write reports backpressure and no drain is ever emitted.
    writableLength: 0,
    writableHighWaterMark: getDefaultHighWaterMark(false),
    on: NO_OP,
    removeListener: NO_OP,
    destroy: NO_OP,
    cork: NO_OP,
    uncork: NO_OP,
    write: (
      data: Uint8Array | string,
      encoding?: string | null | (() => void),
      callback?: () => void,
    ) => {
      if (typeof encoding === 'function') {
        callback = encoding;
        encoding = null;
      }

      return write(data, encoding ?? null, callback);
    },
  };
}

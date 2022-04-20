//#region Imports

import { Readable, Writable } from 'stream';

//#endregion

/**
 * Wait asynchronous the stream to complete
 *
 * @param stream - The stream
 *
 * @breadcumb Core / Stream
 * @public
 */
export function waitForStreamComplete<TStream extends Readable | Writable>(
  stream: TStream,
): Promise<TStream> {
  if ('readableEnded' in stream && stream.readableEnded)
    return Promise.resolve(stream);

  if ('writableEnded' in stream && stream.writableEnded)
    return Promise.resolve(stream);

  return new Promise<TStream>((resolve, reject) => {
    // Reading the {@link https://github.com/nodejs/node/blob/v12.22.9/lib/events.js#L262 | emit source code},
    // it's almost impossible to complete being called twice because the emit function runs synchronously and removes the other listeners,
    // but I'll leave it at that because I didn't write that code, so I couldn't figure out what the author thought when he wrote this.
    let isComplete = false;

    function complete(err) {
      /* istanbul ignore next */
      if (isComplete) return;

      isComplete = true;

      stream.removeListener('error', complete);
      stream.removeListener('end', complete);
      stream.removeListener('finish', complete);

      if (err) reject(err);
      else resolve(stream);
    }

    stream.once('error', complete);
    stream.once('end', complete);
    stream.once('finish', complete);
  });
}

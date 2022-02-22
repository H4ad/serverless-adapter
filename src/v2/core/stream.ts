//#region Imports

import { IncomingMessage, OutgoingMessage } from 'http';

//#endregion

/**
 * Wait asynchronous the stream to complete
 *
 * @param stream The stream
 */
export function waitForStreamComplete<
  TStream extends IncomingMessage | OutgoingMessage,
>(stream: TStream): Promise<TStream> {
  if ('complete' in stream && stream.complete) return Promise.resolve(stream);

  if ('writableEnded' in stream && stream.writableEnded)
    return Promise.resolve(stream);

  return new Promise<TStream>((resolve, reject) => {
    stream.once('error', complete);
    stream.once('end', complete);
    stream.once('finish', complete);

    let isComplete = false;

    function complete(err) {
      if (isComplete) return;

      isComplete = true;

      stream.removeListener('error', complete);
      stream.removeListener('end', complete);
      stream.removeListener('finish', complete);

      if (err) reject(err);
      else resolve(stream);
    }
  });
}

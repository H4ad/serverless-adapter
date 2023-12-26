// credits to: https://github.com/b4nst/stream-mock/pull/64/files#diff-52aee274967f2fcfa3ffa78ebba2f510dd23d176aa92ccf8c0ad4843373f5ce7

import { Readable, ReadableOptions } from 'node:stream';
import { IReadableMock } from 'stream-mock';

/**
 * ErrorReadableMock is a readable stream that mocks error.
 *
 * @example
 * ```typescript
 * import { ErrorReadableMock } from 'stream-mock';
 *
 * const reader = new ErrorReadble(new Error("mock error"));
 * reader.on("data", () => console.log('not called'));
 * reader.on("error", e => console.log('called'));
 * ```
 *
 * @internal
 */
export default class ErrorReadableMock
  extends Readable
  implements IReadableMock
{
  /**
   * @param expectedError - error to be passed on callback.
   * @param options - Readable stream options.
   */
  constructor(expectedError: Error, options: ReadableOptions = {}) {
    super(options);
    this.expectedError = expectedError;
  }

  public it: IterableIterator<any> = [][Symbol.iterator]();
  private expectedError: Error;

  // tslint:disable-next-line:function-name Not responsible of this function name
  public _read() {
    this.destroy(this.expectedError);
  }
}

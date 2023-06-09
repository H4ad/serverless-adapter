import { ObjectReadableMock, ObjectWritableMock } from 'stream-mock';
import { describe, expect, it } from 'vitest';
import { NO_OP, waitForStreamComplete } from '../../src';
import ErrorReadableMock from './utils/stream';

describe('waitForStreamComplete', () => {
  it('should wait for the writable stream to complete', async () => {
    const testedData = 'test';

    const read = new ObjectReadableMock(testedData);
    const writer = new ObjectWritableMock();

    read.pipe(writer);

    const waitedStream = await waitForStreamComplete(writer);

    expect(waitedStream).toBe(writer);
    expect(writer.data.join('')).toBe(testedData);

    const waitedStream2 = await waitForStreamComplete(writer);

    expect(waitedStream2).toBe(writer);
    expect(writer.data.join('')).toBe(testedData);
  });

  it('should wait for the readable stream to complete', async () => {
    const testedData: number[] = [0, 1, 2, 3, 4];

    const read = new ObjectReadableMock(testedData);
    const resultData: number[] = [];

    read.on('data', value => resultData.push(value));

    const waitedStream = await waitForStreamComplete(read);

    expect(waitedStream).toBe(read);
    expect(resultData).toStrictEqual(testedData);

    const waitedStream2 = await waitForStreamComplete(read);

    expect(waitedStream2).toBe(read);
    expect(resultData).toStrictEqual(testedData);
  });

  it('should throw error when error occours', async () => {
    const error = new Error('error on read');

    const read = new ErrorReadableMock(error, { objectMode: true });

    read.on('data', NO_OP);

    await expect(waitForStreamComplete(read)).rejects.toThrowError(error);
  });

  it('should handle correctly if events emit end and finish', async () => {
    const testedData: number[] = [0, 1, 2, 3, 4];
    const read = new ObjectReadableMock(testedData);

    setTimeout(() => {
      read.pause();

      read.emit('error');
      read.emit('end');
      read.emit('finish');

      read.resume();
    }, 100);

    await expect(waitForStreamComplete(read)).resolves.not.toThrowError();
  });
});

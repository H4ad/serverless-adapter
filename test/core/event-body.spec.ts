import { getEventBodyAsBuffer } from '../../src';

describe('getEventBodyAsBuffer', () => {
  it('should return correctly the body in utf-8 as buffer', () => {
    const body = '{}';

    const [bodyAsBuffer, contentLength] = getEventBodyAsBuffer(body, false);

    expect(bodyAsBuffer).toBeInstanceOf(Buffer);
    expect(contentLength).toBe(2);

    expect(bodyAsBuffer.toString('utf8')).toBe(body);
  });

  it('should return correctly the body in base64 as buffer', () => {
    const body = Buffer.from('{}', 'utf8').toString('base64');

    const [bodyAsBuffer, contentLength] = getEventBodyAsBuffer(body, true);

    expect(bodyAsBuffer).toBeInstanceOf(Buffer);
    expect(contentLength).toBe(2);

    expect(bodyAsBuffer.toString('base64')).toBe(body);
  });
});

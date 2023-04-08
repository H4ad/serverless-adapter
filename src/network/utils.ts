/**
 * Get the data from a buffer, string, or Uint8Array
 *
 * @param data - The data that was written inside the stream
 */
export function getString(data: Buffer | string | unknown) {
  if (Buffer.isBuffer(data)) return data.toString('utf8');
  else if (typeof data === 'string') return data;
  else if (data instanceof Uint8Array) return new TextDecoder().decode(data);
  else throw new Error(`response.write() of unexpected type: ${typeof data}`);
}

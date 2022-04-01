/**
 * Get the event body as buffer from body string with content length
 *
 * @example```typescript
 * const body = '{}';
 * const [buffer, contentLength] = getEventBodyAsBuffer(body, false);
 * console.log(buffer);
 * // <Buffer 7b 7d>
 * console.log(contentLength);
 * // 2
 *
 * @param body The body string that can be encoded or not
 * @param isBase64Encoded Tells if body string is encoded in base64
 */
export function getEventBodyAsBuffer(
  body: string,
  isBase64Encoded: boolean,
): [body: Buffer, contentLength: number] {
  const encoding: BufferEncoding = isBase64Encoded ? 'base64' : 'utf8';

  const buffer = Buffer.from(body, encoding);
  const contentLength = Buffer.byteLength(buffer, encoding);

  return [buffer, contentLength];
}

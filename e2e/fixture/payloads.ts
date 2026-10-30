import { createHash } from 'node:crypto';

export function sha256(value: Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

/**
 * A real 1x1 PNG. Small enough to keep in source, valid enough that a
 * `content-type: image/png` response cannot pass by accident.
 */
export const PNG_1X1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

export const PNG_SHA256 = sha256(PNG_1X1);

export const LARGE_SIZE = 256 * 1024;

const UNIT = '0123456789abcdef';

/**
 * Deterministic 256 KiB body. Determinism matters because the smoke compares
 * the hash on the other side of the wire.
 */
export function largeBody(): Buffer {
  const repeated = UNIT.repeat(Math.ceil(LARGE_SIZE / UNIT.length));

  return Buffer.from(repeated.slice(0, LARGE_SIZE), 'utf8');
}

export const LARGE_SHA256 = sha256(largeBody());

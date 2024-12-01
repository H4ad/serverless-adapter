import { describe, vitest } from 'vitest';
import { createBodyParserTests } from './body-parser.framework.helper';

vitest.mock('body-parser', async () => {
  return await import('body-parser-v2');
});

describe('Body Parser v2', () => {
  createBodyParserTests();
});

// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    target: 'es2022',
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: [
        'src/**/@types/**/*.ts',
        'src/**/index.doc.ts',
        'src/**/index.ts',
      ],
    },
  },
});

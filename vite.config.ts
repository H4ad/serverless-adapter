import { glob } from 'glob';
import * as path from 'path';
import { defineConfig } from 'vitest/config';

const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
  ...(!isTest && {
    esbuild: {
      format: 'cjs',
      platform: 'node',
      target: 'node18',
      sourcemap: 'external',
      minifyIdentifiers: false,
    },
    build: {
      outDir: 'lib',
      emptyOutDir: true,
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['cjs'],
      },
      rollupOptions: {
        external: ['yeoman-generator'],
        input: glob.sync(path.resolve(__dirname, 'src/**/*.ts')),
        output: {
          preserveModules: true,
          entryFileNames: entry => {
            const { name } = entry;

            const fileName = `${name}.js`;

            return fileName;
          },
        },
      },
    },
  }),
  test: {
    coverage: {
      include: ['src/**'],
      exclude: [
        'src/**/@types/**/*.ts',
        'src/**/index.doc.ts',
        'src/**/index.ts',
      ],
    },
  },
});

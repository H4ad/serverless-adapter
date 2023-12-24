import { execSync } from 'node:child_process';
import { defineConfig } from 'tsup';

const adapters = [
  'apollo-server',
  'aws',
  'azure',
  'digital-ocean',
  'dummy',
  'huawei',
];

const frameworks = [
  'apollo-server',
  'body-parser',
  'cors',
  'deepkit',
  'express',
  'fastify',
  'hapi',
  'koa',
  'lazy',
  'trpc',
];

const handlers = [
  'aws',
  'azure',
  'default',
  'digital-ocean',
  'firebase',
  'gcp',
  'huawei',
];

const resolvers = ['aws-context', 'callback', 'dummy', 'promise'];

const libEntries = [
  ...adapters.map(adapter => `src/adapters/${adapter}/index.ts`),
  ...frameworks.map(framework => `src/frameworks/${framework}/index.ts`),
  ...handlers.map(handler => `src/handlers/${handler}/index.ts`),
  ...resolvers.map(resolver => `src/resolvers/${resolver}/index.ts`),
];

const createExport = (filePath: string) => ({
  import: {
    types: `./lib/${filePath}.d.ts`,
    default: `./lib/${filePath}.js`,
  },
  require: {
    types: `./lib/${filePath}.d.cts`,
    default: `./lib/${filePath}.cjs`,
  },
});

const createExportReducer =
  (initialPath: string) => (acc: object, name: string) => {
    acc[`./${initialPath}/${name}`] = createExport(
      `${initialPath}/${name}/index`,
    );

    return acc;
  };

const packageExports = {
  '.': createExport('index'),
  ...adapters.reduce(createExportReducer('adapters'), {}),
  ...frameworks.reduce(createExportReducer('frameworks'), {}),
  ...handlers.reduce(createExportReducer('handlers'), {}),
  ...resolvers.reduce(createExportReducer('resolvers'), {}),
};

execSync(`npm pkg set exports='${JSON.stringify(packageExports)}' --json`);

export default defineConfig({
  outDir: './lib',
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  entry: ['src/index.ts', ...libEntries],
  sourcemap: true,
  skipNodeModulesBundle: true,
  minify: true,
  target: 'es2022',
  tsconfig: './tsconfig.build.json',
  keepNames: true,
  bundle: true,
});

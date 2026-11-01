import { readFileSync, writeFileSync } from 'node:fs';
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
  'polka',
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
    default: `./lib/${filePath}.mjs`,
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

    acc[`./lib/${initialPath}/${name}`] = createExport(
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

// The exports map is derived from the entry lists above, so rewrite package.json
// before packing. Editing it here instead of shelling out to `npm pkg set` keeps
// the build working with only pnpm installed.
const packageJsonUrl = new URL('./package.json', import.meta.url);
const packageJson = JSON.parse(readFileSync(packageJsonUrl, 'utf8'));

writeFileSync(
  packageJsonUrl,
  `${JSON.stringify({ ...packageJson, exports: packageExports }, null, 2)}\n`,
);

export default defineConfig({
  outDir: './lib',
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  outExtension: ({ format }) => ({
    js: format === 'cjs' ? '.cjs' : '.mjs',
  }),
  cjsInterop: true,
  entry: ['src/index.ts', ...libEntries],
  sourcemap: true,
  skipNodeModulesBundle: true,
  minify: false,
  target: 'es2022',
  tsconfig: './tsconfig.build.json',
  keepNames: true,
  bundle: true,
});

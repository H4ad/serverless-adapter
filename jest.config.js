module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/types/**/*.ts',
    '!<rootDir>/src/**/index.doc.ts',
    '!<rootDir>/src/**/index.ts',
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  resolver: "<rootDir>/node_modules/@deepkit/framework/resolve",
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};

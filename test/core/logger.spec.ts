/* eslint-disable @typescript-eslint/unbound-method */

import {
  SpyInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vitest,
} from 'vitest';
import {
  LogLevels,
  NO_OP,
  createDefaultLogger,
  isInternalLogger,
} from '../../src';

describe('createDefaultLogger', () => {
  const mocks: SpyInstance[] = [];

  beforeEach(() => {
    const mockMethods: (keyof Console)[] = [
      'error',
      'info',
      'warn',
      'log',
      'debug',
    ];

    for (const method of mockMethods) {
      mocks.push(
        vitest.spyOn(global.console, method).mockImplementation(NO_OP),
      );
    }
  });

  afterEach(() => {
    for (const mock of mocks) mock.mockRestore();
  });

  it('should create correctly the logger instance', () => {
    expect(createDefaultLogger()).toBeDefined();
  });

  it('should lazy log when we pass a function', () => {
    const logger = createDefaultLogger({ level: 'debug' });

    logger.debug('debug', () => '=true', ' works');

    expect(global.console.debug).not.toHaveBeenNthCalledWith(
      1,
      'debug=true works',
    );
  });

  it('should log correctly with log level as none', () => {
    const logger = createDefaultLogger({ level: 'none' });

    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.verbose('verbose');
    logger.debug('debug');

    expect(global.console.error).not.toHaveBeenCalledWith('error');
    expect(global.console.warn).not.toHaveBeenCalledWith('warn');
    expect(global.console.info).not.toHaveBeenCalledWith('info');
    expect(global.console.debug).not.toHaveBeenNthCalledWith(1, 'verbose');
    expect(global.console.debug).not.toHaveBeenNthCalledWith(2, 'debug');
  });

  it('should log correctly with log level as error', () => {
    const logger = createDefaultLogger({ level: 'error' });

    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.verbose('verbose');
    logger.debug('debug');

    expect(global.console.error).toHaveBeenCalledWith('error');
    expect(global.console.warn).not.toHaveBeenCalledWith('warn');
    expect(global.console.info).not.toHaveBeenCalledWith('info');
    expect(global.console.debug).not.toHaveBeenNthCalledWith(1, 'verbose');
    expect(global.console.debug).not.toHaveBeenNthCalledWith(2, 'debug');
  });

  it('should log correctly with log level as warn', () => {
    const logger = createDefaultLogger({ level: 'warn' });

    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.verbose('verbose');
    logger.debug('debug');

    expect(global.console.error).toHaveBeenCalledWith('error');
    expect(global.console.warn).toHaveBeenCalledWith('warn');
    expect(global.console.info).not.toHaveBeenCalledWith('info');
    expect(global.console.debug).not.toHaveBeenNthCalledWith(1, 'verbose');
    expect(global.console.debug).not.toHaveBeenNthCalledWith(2, 'debug');
  });

  it('should log correctly with log level as info', () => {
    const logger = createDefaultLogger({ level: 'info' });

    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.verbose('verbose');
    logger.debug('debug');

    expect(global.console.error).toHaveBeenCalledWith('error');
    expect(global.console.warn).toHaveBeenCalledWith('warn');
    expect(global.console.info).toHaveBeenCalledWith('info');
    expect(global.console.debug).not.toHaveBeenNthCalledWith(1, 'verbose');
    expect(global.console.debug).not.toHaveBeenNthCalledWith(2, 'debug');
  });

  it('should log correctly with log level as verbose', () => {
    const logger = createDefaultLogger({ level: 'verbose' });

    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.verbose('verbose');
    logger.debug('debug');

    expect(global.console.error).toHaveBeenCalledWith('error');
    expect(global.console.warn).toHaveBeenCalledWith('warn');
    expect(global.console.info).toHaveBeenCalledWith('info');
    expect(global.console.debug).toHaveBeenNthCalledWith(1, 'verbose');
    expect(global.console.debug).not.toHaveBeenNthCalledWith(2, 'debug');
  });

  it('should log correctly with log level as debug', () => {
    const logger = createDefaultLogger({ level: 'debug' });

    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.verbose('verbose');
    logger.debug('debug');

    expect(global.console.error).toHaveBeenCalledWith('error');
    expect(global.console.warn).toHaveBeenCalledWith('warn');
    expect(global.console.info).toHaveBeenCalledWith('info');
    expect(global.console.debug).toHaveBeenNthCalledWith(1, 'verbose');
    expect(global.console.debug).toHaveBeenNthCalledWith(2, 'debug');
  });
});

describe('isInternalLogger', () => {
  const logLevelRecord: Record<Exclude<LogLevels, 'none'>, true> = {
    debug: true,
    info: true,
    verbose: true,
    warn: true,
    error: true,
  };

  const logLevels = Object.keys(logLevelRecord) as LogLevels[];

  for (const logLevel of logLevels) {
    it(`instance created by createDefaultLogger with logLevel: ${logLevel} should return true`, () => {
      const logger = createDefaultLogger({
        level: logLevel,
      });

      expect(isInternalLogger(logger)).toBe(true);
    });
  }

  it('random isntance of ILogger should not return true', () => {
    expect(
      isInternalLogger({
        debug: NO_OP,
        info: NO_OP,
        verbose: NO_OP,
        warn: NO_OP,
        error: NO_OP,
      }),
    ).toBe(false);
  });
});

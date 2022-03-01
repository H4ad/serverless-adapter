/* eslint-disable @typescript-eslint/unbound-method */

import { createDefaultLogger } from '../../src/v2/core';
import FunctionPropertyNames = jest.FunctionPropertyNames;
import SpyInstance = jest.SpyInstance;

type MethodNames<T> = FunctionPropertyNames<Required<T>>;

describe('createDefaultLogger', () => {
  const mocks: SpyInstance[] = [];

  beforeEach(() => {
    const mockMethods: MethodNames<Console>[] = [
      'error',
      'info',
      'warn',
      'log',
      'debug',
    ];

    for (const method of mockMethods)
      mocks.push(jest.spyOn(global.console, method).mockImplementation());
  });

  afterEach(() => {
    for (const mock of mocks) mock.mockRestore();
  });

  it('should create correctly the logger instance', () => {
    expect(createDefaultLogger()).toBeDefined();
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

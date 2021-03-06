/**
 * The type representing the possible log levels to choose from.
 *
 * @breadcrumb Core / Logger
 * @public
 */
export type LogLevels =
  | 'debug'
  | 'verbose'
  | 'info'
  | 'warn'
  | 'error'
  | 'none';

/**
 * The options to customize {@link ILogger}
 *
 * @breadcrumb Core / Logger
 * @public
 */
export type LoggerOptions = {
  /**
   * Select the log level, {@link LogLevels | see more}.
   *
   * @defaultValue error
   */
  level: LogLevels;
};

/**
 * The log function used in any level.
 *
 * @breadcrumb Core / Logger
 * @public
 */
export type LoggerFN = (message: any, ...additional: any[]) => void;

/**
 * The interface representing the logger, you can provide a custom logger by implementing this interface.
 *
 * @breadcrumb Core / Logger
 * @public
 */
export type ILogger = Record<Exclude<LogLevels, 'none'>, LoggerFN>;

/**
 * The symbol used to check against an ILogger instace to verify if that ILogger was created by this library
 *
 * @breadcrumb Core / Logger
 * @public
 */
const InternalLoggerSymbol = Symbol('InternalLogger');

/**
 * The method used to create a simple logger instance to use in this library.
 *
 * @remarks Behind the scenes, this simple logger sends the message to the `console` methods.
 *
 * @example
 * ```typescript
 * const logger = createDefaultLogger();
 *
 * logger.error('An error happens.');
 * // An error happens.
 * ```
 *
 * @param level - Select the level of the log
 *
 * @breadcrumb Core / Logger
 * @public
 */
export function createDefaultLogger(
  { level }: LoggerOptions = { level: 'error' },
): ILogger {
  const errorLogLevel = ['debug', 'verbose', 'info', 'warn', 'error'];
  const warnLogLevel = ['debug', 'verbose', 'info', 'warn'];
  const infoLogLevel = ['debug', 'verbose', 'info'];
  const verboseLogLevel = ['debug', 'verbose'];

  return {
    [InternalLoggerSymbol]: true,
    error: (message, ...additional) => {
      if (!errorLogLevel.includes(level)) return;

      console.error(message, ...additional);
    },
    warn: (message, ...additional) => {
      if (!warnLogLevel.includes(level)) return;

      console.warn(message, ...additional);
    },
    info: (message, ...additional) => {
      if (!infoLogLevel.includes(level)) return;

      console.info(message, ...additional);
    },
    verbose: (message, ...additional) => {
      if (!verboseLogLevel.includes(level)) return;

      console.debug(message, ...additional);
    },
    debug: (message, ...additional) => {
      if (level !== 'debug') return;

      console.debug(message, ...additional);
    },
  } as ILogger;
}

/**
 * The method used to chck if logger was created by this library, or it was defined by the user.
 *
 * @param logger - The instance of the logger to check
 *
 * @breadcrumb Core / Logger
 * @public
 */
export function isInternalLogger(logger: ILogger): boolean {
  return !!logger[InternalLoggerSymbol];
}

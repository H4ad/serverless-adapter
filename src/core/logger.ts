import { NO_OP } from './no-op';

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

const logLevels: Record<
  LogLevels,
  [level: LogLevels, consoleMethod: keyof Console][]
> = {
  debug: [
    ['debug', 'debug'],
    ['verbose', 'debug'],
    ['info', 'info'],
    ['error', 'error'],
    ['warn', 'warn'],
  ],
  verbose: [
    ['verbose', 'debug'],
    ['info', 'info'],
    ['error', 'error'],
    ['warn', 'warn'],
  ],
  info: [
    ['info', 'info'],
    ['error', 'error'],
    ['warn', 'warn'],
  ],
  warn: [
    ['warn', 'warn'],
    ['error', 'error'],
  ],
  error: [['error', 'error']],
  none: [],
};

const lazyPrint = value => {
  if (typeof value === 'function') return value();

  return value;
};

const print =
  (fn: string) =>
  (message, ...additional) =>
    console[fn](message, ...additional.map(lazyPrint));

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
  const levels = logLevels[level];

  if (!levels) throw new Error('Invalid log level');

  const logger = {
    [InternalLoggerSymbol]: true,
    error: NO_OP,
    debug: NO_OP,
    info: NO_OP,
    verbose: NO_OP,
    warn: NO_OP,
  } as ILogger;

  for (const [level, consoleMethod] of levels)
    logger[level] = print(consoleMethod);

  return logger;
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

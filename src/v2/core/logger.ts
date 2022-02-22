export type LogLevels = 'debug' | 'verbose' | 'info' | 'warn' | 'error';
export type LoggerOptions = { level: LogLevels };
export type LoggerFN = (message: any, ...additional: any[]) => void;
export type ILogger = Record<LogLevels, LoggerFN>;

export function createDefaultLogger(
  { level }: LoggerOptions = { level: 'error' },
): ILogger {
  const errorLogLevel = ['debug', 'verbose', 'info', 'warn', 'error'];
  const warnLogLevel = ['debug', 'verbose', 'info', 'warn'];
  const infoLogLevel = ['debug', 'verbose', 'info'];
  const verboseLogLevel = ['debug', 'verbose'];

  return {
    error: (message, ...additional) => {
      if (!errorLogLevel.includes(level)) return;

      console.error({
        message,
        ...additional,
      });
    },
    warn: (message, ...additional) => {
      if (!warnLogLevel.includes(level)) return;

      console.warn({
        message,
        ...additional,
      });
    },
    info: (message, ...additional) => {
      if (!infoLogLevel.includes(level)) return;

      console.info({
        message,
        ...additional,
      });
    },
    verbose: (message, ...additional) => {
      if (!verboseLogLevel.includes(level)) return;

      console.debug({
        message,
        ...additional,
      });
    },
    debug: (message, ...additional) => {
      if (level !== 'debug') return;

      console.debug({
        message,
        ...additional,
      });
    },
  };
}

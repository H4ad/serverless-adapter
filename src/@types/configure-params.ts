import { ServerlessFramework } from '../frameworks';
import { ILogger, LoggerOptions } from '../utils/logger';
import { BinarySettings } from './binary-settings';
import { EventSources } from './event-sources';

export interface ConfigureParams {
  app?: any;
  logSettings?: LoggerOptions;
  log?: ILogger;
  framework?: ServerlessFramework;
  binaryMimeTypes?: string[];
  binarySettings?: BinarySettings;
  resolutionMode?: 'PROMISE' | 'CALLBACK' | 'CONTEXT';
  eventSourceName?: string;
  eventSource?: EventSource; // TODO:
  eventSourceRoutes?: { [key in EventSources]?: string };
  respondWithErrors?: boolean;
}

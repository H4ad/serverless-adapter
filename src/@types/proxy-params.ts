import { RequestListener } from 'http';
import { BinarySettings } from './binary-settings';

export interface ProxyParams {
  app: RequestListener;
  binaryMimeTypes?: string[];
  binarySettings?: BinarySettings;
}

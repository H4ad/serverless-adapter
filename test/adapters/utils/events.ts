import { allAWSEvents } from '../aws/utils/events';
import { allAzureEvents } from '../azure/utils/events';
import { allHuaweiEvents } from '../huawei/utils/events';

/**
 * Events from all event sources that can be used to test adapters
 */
export const allEvents: [string, any][] = [
  ...allAWSEvents,
  ...allHuaweiEvents,
  ...allAzureEvents,
];

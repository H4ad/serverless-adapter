import { allAWSEvents } from '../aws/utils/events';

/**
 * Events from all event sources that can be used to test adapters
 */
export const allEvents: [string, any][] = [...allAWSEvents];

import type { CloudModule } from '@e2e/core/lib/types';
import { down } from './down';
import { leftovers } from './leftovers';
import { test } from './test';
import { up } from './up';

export const cloudModule: CloudModule = { up, test, down, leftovers };

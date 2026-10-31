export type CloudName = 'aws' | 'azure' | 'do' | 'edge' | 'firebase' | 'gcp';

/**
 * What a cloud module writes after `up` and reads in `test`, `down` and
 * `leftovers`. `resources` holds provider identifiers (stack name, resource
 * group, package/function), `endpoints` holds the URLs the smoke hits.
 */
export interface RunState {
  cloud: CloudName;
  runId: string;
  createdAt: string;
  expireAt: string;
  region: string;
  endpoints: Record<string, string>;
  resources: Record<string, string>;
}

export interface ParsedResponse {
  status: number;
  headers: Record<string, string>;
  setCookies: string[];
  body: Buffer;
  text: string;
  json<T = unknown>(): T;
}

/**
 * The contract every cloud module implements. `down` and `leftovers` must work
 * without a state object, so a crashed run can still be cleaned up.
 */
export interface CloudModule {
  up(): Promise<RunState>;
  test(state: RunState): Promise<boolean>;
  down(state?: RunState): Promise<void>;
  leftovers(state?: RunState): Promise<string[]>;
}

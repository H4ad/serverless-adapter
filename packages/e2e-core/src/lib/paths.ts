import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * The directory of the module that passes its `import.meta`, so a path is
 * resolved from the source tree instead of whatever the process cwd is. The
 * e2e runs from the repo root, from a workspace filter and from CI alike.
 */
export function moduleDir(meta: ImportMeta): string {
  return dirname(fileURLToPath(meta.url));
}

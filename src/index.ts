import configure from './configure';
import { getCurrentInvoke } from './utils/current-invoke';

export { getCurrentInvoke };
export { configure };

export default configure;

// Legacy/deprecated:

export function createServer(app, serverListenCallback, binaryMimeTypes) {
  console.warn(
    "[DEPRECATION NOTICE] You're using the deprecated createServer method that will be removed in the next major version. See https://github.com/vendia/serverless-express/blob/mainline/UPGRADE.md to upgrade."
  );

  if (serverListenCallback) {
    throw new Error('serverListenCallback is no longer supported.');
  }

  const configureOptions = {
    app,
    binarySettings: {
      contentTypes: binaryMimeTypes,
    },
  };

  return configureOptions;
}

export function proxy(
  configureOptions,
  event,
  context,
  resolutionMode,
  callback
) {
  console.warn(
    "[DEPRECATION NOTICE] You're using the deprecated proxy method that will be removed in the next major version. See https://github.com/vendia/serverless-express/blob/mainline/UPGRADE.md to upgrade."
  );

  const se = configure({
    ...configureOptions,
    resolutionMode,
  });
  return se(event, context, callback);
}

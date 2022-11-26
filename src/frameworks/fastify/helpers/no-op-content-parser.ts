//#region Imports

import { FastifyInstance } from 'fastify';

//#endregion

/**
 * Just return the current body as it was parsed.
 *
 * @remarks This function is intended to be used with BodyParserFrameworks.
 *
 * @param app - The instance of fastify
 * @param contentType - The content type to be anuled
 *
 * @breadcrumb Frameworks / FastifyFramework / Helpers
 * @public
 */
export function setNoOpForContentType(
  app: FastifyInstance,
  contentType: string,
): void {
  app.addContentTypeParser(contentType, (_, req, done) => {
    return done(null, (req as any).body);
  });
}

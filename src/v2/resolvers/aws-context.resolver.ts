//#region Imports

import type { Context } from 'aws-lambda';
import {
  DelegatedResolver,
  Resolver,
  ResolverContract,
  ResolverProps,
} from '../contracts';

//#endregion

/**
 * The class that implements the resolver by using the AWS Context object
 *
 * @note```md
 * From the AWS Documentation, describing the functions used in this resolver:
 * // Functions for compatibility with earlier Node.js Runtime v0.10.42
 * // No longer documented, so they are deprecated, but they still work
 * // as of the 12.x runtime, so they are not removed from the types.
 * ```
 * @deprecated
 */
export class AwsContextResolver
  implements ResolverContract<any, Context, any, any>
{
  /**
   * @inheritDoc
   */
  public createResolver({
    context,
    event,
    log,
    respondWithErrors,
    adapter,
  }: ResolverProps<any, Context, any, any>): Resolver<any, void> {
    if (!context) {
      throw new Error(
        'Could not figure out how to create the resolver because the "context" argument was not sent.',
      );
    }

    if (!context.succeed) {
      throw new Error(
        'Could not figure out how to create the resolver because the "context" argument didn\'t have the "succeed" function.',
      );
    }

    if (!context.fail) {
      throw new Error(
        'Could not figure out how to create the resolver because the "context" argument didn\'t have the "fail" function.',
      );
    }

    const delegatedResolver: DelegatedResolver<any> = {
      succeed: response => context.succeed(response),
      fail: error => context.fail(error),
    };

    return {
      run: task => {
        task()
          .then(response => delegatedResolver.succeed(response))
          .catch(error => {
            log.error(
              'SERVERLESS_ADAPTER:RESPOND_TO_EVENT_SOURCE_WITH_ERROR',
              error,
            );

            adapter.onErrorWhileForwarding({
              delegatedResolver,
              error,
              log,
              event,
              respondWithErrors,
            });
          });
      },
    };
  }
}

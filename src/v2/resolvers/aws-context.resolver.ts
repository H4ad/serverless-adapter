//#region Imports

import type { Context } from 'aws-lambda';
import { Resolver, ResolverContract, ResolverProps } from '../contracts';

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
  }: ResolverProps<any, Context, any, any>): Resolver<any> {
    return {
      succeed: response => context.succeed(response),
      fail: error => context.fail(error),
    };
  }
}

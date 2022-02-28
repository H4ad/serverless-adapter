//#region Imports

import {
  DelegatedResolver,
  Resolver,
  ResolverContract,
  ResolverProps,
} from '../contracts';

//#endregion

/**
 * The default signature of the callback sent by serverless
 */
export type ServerlessCallback<TResponse> = (
  error: Error | null,
  success: TResponse | null,
) => void;

/**
 * The class that implements the resolver using the callback function sent by serverless
 *
 * @note To use this resolver on AWS, you MUST leave `{@link https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html callbackWaitsForEmptyEventLoop}` as true, otherwise, AWS will not wait for this resolver to resolve.
 */
export class CallbackResolver
  implements ResolverContract<any, any, ServerlessCallback<any>, any>
{
  /**
   * @inheritDoc
   */
  public createResolver({
    callback,
    event,
    log,
    respondWithErrors,
    adapter,
  }: ResolverProps<any, any, ServerlessCallback<any>, any>): Resolver<
    any,
    void
  > {
    if (!callback) {
      throw new Error(
        'Could not figure out how to create the resolver because the "callback" argument was not sent.',
      );
    }

    const delegatedResolver: DelegatedResolver<any> = {
      succeed: response => callback(null, response),
      fail: error => callback(error, null),
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

//#region Imports

import {
  DelegatedResolver,
  Resolver,
  ResolverContract,
  ResolverProps,
} from '../../contracts';

//#endregion

/**
 * The default signature of the callback sent by serverless
 *
 * @public
 */
export type ServerlessCallback<TResponse> = (
  error: Error | null,
  success: TResponse | null,
) => void;

/**
 * The class that implements the resolver using the callback function sent by serverless
 *
 * @remarks To use this resolver on AWS, you MUST leave `{@link https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html | callbackWaitsForEmptyEventLoop}` as true, otherwise, AWS will not wait for this resolver to resolve.
 *
 * @public
 */
export class CallbackResolver<TEvent, TContext, TResponse>
  implements
    ResolverContract<
      TEvent,
      TContext,
      ServerlessCallback<any>,
      TResponse,
      void
    >
{
  /**
   * {@inheritDoc}
   */
  public createResolver({
    callback,
    event,
    log,
    respondWithErrors,
    adapter,
  }: ResolverProps<
    TEvent,
    TContext,
    ServerlessCallback<any>,
    TResponse
  >): Resolver<any, void> {
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

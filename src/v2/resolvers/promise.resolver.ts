//#region Imports

import {
  DelegatedResolver,
  Resolver,
  ResolverContract,
  ResolverProps,
} from '../contracts';

//#endregion

/**
 * The class that implements the resolver using the promise object sent by this library
 */
export class PromiseResolver implements ResolverContract<any, any, any, any> {
  /**
   * @inheritDoc
   */
  public createResolver({
    event,
    log,
    respondWithErrors,
    adapter,
  }: ResolverProps<any, any, any, any>): Resolver<any, Promise<any>> {
    return {
      run: ({ task }) => {
        return new Promise((resolve, reject) => {
          const delegatedResolver: DelegatedResolver<any> = {
            succeed: response => resolve(response),
            fail: error => reject(error),
          };

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
        });
      },
    };
  }
}

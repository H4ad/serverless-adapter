//#region Imports

import { Resolver, ResolverContract, ResolverProps } from '../contracts';

//#endregion

/**
 * The class that implements the resolver using the promise object sent by this library
 */
export class PromiseResolver implements ResolverContract<any, any, any, any> {
  /**
   * @inheritDoc
   */
  public createResolver({
    promise,
  }: ResolverProps<any, any, any, any>): Resolver<any> {
    return {
      succeed: response => promise.resolve(response),
      fail: error => promise.reject(error),
    };
  }
}

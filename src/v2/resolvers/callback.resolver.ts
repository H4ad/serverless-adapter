//#region Imports

import { Resolver, ResolverContract, ResolverProps } from '../contracts';

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
 */
export class CallbackResolver
  implements ResolverContract<any, any, ServerlessCallback<any>, any>
{
  /**
   * @inheritDoc
   */
  public createResolver({
    callback,
  }: ResolverProps<any, any, ServerlessCallback<any>, any>): Resolver<any> {
    return {
      succeed: response => callback!(null, response),
      fail: error => callback!(error, null),
    };
  }
}

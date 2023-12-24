//#region Imports

import type {
  AdapterContract,
  AdapterRequest,
  OnErrorProps,
} from '../../contracts';
import { EmptyResponse, type IEmptyResponse } from '../../core';

//#endregion

/**
 * The class that represents a dummy adapter that does nothing and can be used by the cloud that doesn't use adapters.
 *
 * @breadcrumb Adapters / DummyAdapter
 * @public
 */
export class DummyAdapter implements AdapterContract<any, any, void> {
  /**
   * {@inheritDoc}
   */
  public canHandle(): boolean {
    return true;
  }

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return DummyAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(): AdapterRequest {
    return {
      method: 'POST',
      body: void 0,
      path: '/dummy',
      headers: {},
    };
  }

  /**
   * {@inheritDoc}
   */
  public getResponse(): IEmptyResponse {
    return EmptyResponse;
  }

  /**
   * {@inheritDoc}
   */
  public onErrorWhileForwarding(props: OnErrorProps<any, void>): void {
    props.delegatedResolver.succeed();
  }
}

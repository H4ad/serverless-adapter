//#region Imports

import type {
  AdapterContract,
  AdapterRequest,
  GetResponseAdapterProps,
  OnErrorProps,
} from '../../contracts';
import {
  type ILogger,
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
} from '../../core';

//#endregion

/**
 * The options for {@link ApolloServerMutationAdapter}
 *
 * @breadcrumb Adapters / Apollo Server / ApolloServerMutationAdapter
 * @public
 */
export type ApolloServerMutationAdapterOptions = {
  /**
   * Specify the name of mutation that will be called when an event was received
   */
  mutationName: string;

  /**
   * Specify the mutation result schema.
   * Use this to customize the behavior when you need to return a specific object to be handled by the Adapter, like SQS with Batch Mode.
   *
   * @defaultValue `{ __typename }`
   */
  mutationResultQuery?: string;
};

/**
 * The adapter that wraps another adapter to force a transformation of the event data as a mutation to Apollo Server be able to handle.
 *
 * @breadcrumb Adapters / Apollo Server / ApolloServerMutationAdapter
 * @public
 */
export class ApolloServerMutationAdapter<TEvent, TContext, TResponse>
  implements AdapterContract<TEvent, TContext, TResponse>
{
  //#region Constructor

  /**
   * The default constructor
   */
  constructor(
    protected readonly baseAdapter: AdapterContract<
      TEvent,
      TContext,
      TResponse
    >,
    protected readonly options: ApolloServerMutationAdapterOptions,
  ) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown, context: TContext, log: ILogger): boolean {
    return this.baseAdapter.canHandle(event, context, log);
  }

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return this.baseAdapter.getAdapterName() + 'Mutation';
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(
    event: TEvent,
    context: TContext,
    log: ILogger,
  ): AdapterRequest {
    const request = this.baseAdapter.getRequest(event, context, log);

    request.method = 'POST';

    const operationName = this.options.mutationName;
    const mutationResultQuery = getDefaultIfUndefined(
      this.options.mutationResultQuery,
      '{ __typename }',
    );

    const mutationBody = JSON.stringify({
      operationName,
      query: `mutation ${operationName} ($event: String) { ${operationName} (event: $event) ${mutationResultQuery} }`,
      variables: {
        event: request.body?.toString() || '',
      },
    });

    const [buffer, contentLength] = getEventBodyAsBuffer(mutationBody, false);

    request.body = buffer;
    request.headers['content-type'] = 'application/json';
    request.headers['content-length'] = String(contentLength);

    return request;
  }

  /**
   * {@inheritDoc}
   */
  public getResponse(props: GetResponseAdapterProps<TEvent>): TResponse {
    const { data, errors } = JSON.parse(props.body);

    if (!errors) {
      return this.baseAdapter.getResponse({
        ...props,
        body: JSON.stringify(data[this.options.mutationName]),
      });
    }

    // when error happens, is the responsability of base adapter
    // to deal with error status code.
    return this.baseAdapter.getResponse(props);
  }

  /**
   * {@inheritDoc}
   */
  public onErrorWhileForwarding(props: OnErrorProps<TEvent, TResponse>): void {
    return this.baseAdapter.onErrorWhileForwarding(props);
  }

  //#endregion
}

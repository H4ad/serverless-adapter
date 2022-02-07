/**
 * The type that represents a resolver used to send the response, error or success, to the client
 */
export type Resolver<TResponse> = {
  /**
   * Send the success response to the client
   *
   * @param success The serverless response
   */
  succeed: (response: TResponse) => void;

  /**
   * Send the error response to the client
   *
   * @param error The error object
   */
  fail: (error: Error) => void;
};

/**
 * The object that represents the promise resolver instanciated
 */
export type PromiseResolver<TResponse> = {
  /**
   * Send the success response to the client
   *
   * @param success The serverless response
   */
  resolve: (success: TResponse) => void;

  /**
   * Send the error response to the client
   *
   * @param error The error object
   */
  reject: (error: Error) => void;
};

/**
 * The createResolver contract props
 */
export type ResolverProps<TEvent, TContext, TCallback, TResponse> = {
  /**
   * The event sent by the serverless environment
   */
  event: TEvent;

  /**
   * The context sent by serverless
   */
  context: TContext;

  /**
   * The callback sent by serverless
   */
  callback?: TCallback;

  /**
   * An object created by the library to have a default resolver reliable from cloud to cloud
   */
  promise: PromiseResolver<TResponse>;
};

/**
 * The interface that represents the contract used to send the response to the client
 */
export interface ResolverContract<
  TEvent = any,
  TContext = any,
  TCallback = any,
  TResponse = any
> {
  /**
   * Create the resolver based on the context, callback or promise
   *
   * @param props The props used to create the resolver
   */
  createResolver(
    props: ResolverProps<TEvent, TContext, TCallback, TResponse>
  ): Resolver<TResponse>;
}

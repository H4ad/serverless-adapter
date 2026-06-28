import { AsyncLocalStorage } from 'node:async_hooks';

/**
 * The type that represents the event created by the serverless trigger and the context created by the serverless environment for the current async invocation scope.
 *
 * @breadcrumb Core / Current Invoke
 * @public
 */
export type CurrentInvoke<TEvent, TContext> = {
  /**
   * The event created by the serverless trigger
   *
   * @remarks It's only null when you call {@link getCurrentInvoke} outside this library's current async invocation scope.
   */
  event: TEvent | null;

  /**
   * The context created by the serverless environment
   *
   * @remarks It's only null when you call {@link getCurrentInvoke} outside this library's current async invocation scope.
   */
  context: TContext | null;
};

const currentInvokeStorage = new AsyncLocalStorage<
  CurrentInvoke<unknown, unknown>
>();

const emptyCurrentInvoke: CurrentInvoke<unknown, unknown> = Object.freeze({
  context: null,
  event: null,
});

/**
 * Get the event created by the serverless trigger and the context created by the serverless environment for the current async invocation scope.
 *
 * @remarks
 * This function is request-scoped. During framework execution it returns the `event` and `context` for the invocation being processed by the current async call chain. Outside a handler-created invocation scope it returns `{ event: null, context: null }`.
 *
 * Concurrent invocations are isolated from each other, so overlapping requests do not overwrite the current invoke visible to framework code.
 *
 * @example
 * ```typescript
 * import type { ALBEvent, Context } from 'aws-lambda';
 *
 * // inside framework code that handles the aws alb request.
 * const { event, context } = getCurrentInvoke<ALBEvent, Context>();
 * ```
 *
 * @breadcrumb Core / Current Invoke
 * @public
 */
export function getCurrentInvoke<TEvent = any, TContext = any>(): CurrentInvoke<
  TEvent,
  TContext
> {
  return (currentInvokeStorage.getStore() ??
    emptyCurrentInvoke) as CurrentInvoke<TEvent, TContext>;
}

/**
 * Run a callback with the event created by the serverless trigger and the context created by the serverless environment bound to the current async invocation scope.
 *
 * @remarks
 * Use this when implementing a custom handler that forwards requests into framework code. The built-in handlers call it before creating the resolver and forwarding the request, so {@link getCurrentInvoke} can read the right invoke data throughout the framework's async work.
 *
 * @param event - The event created by the serverless trigger
 * @param context - The context created by the serverless environment
 * @param callback - The callback to run inside the current invocation scope
 *
 * @breadcrumb Core / Current Invoke
 * @public
 */
export function runWithCurrentInvoke<
  TEvent = any,
  TContext = any,
  TReturn = unknown,
>(
  { event, context }: CurrentInvoke<TEvent, TContext>,
  callback: () => TReturn,
): TReturn {
  return currentInvokeStorage.run(
    {
      event,
      context,
    },
    callback,
  );
}

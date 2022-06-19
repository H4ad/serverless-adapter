/**
 * The type that represents the object that handles the references to the event created by the serverless trigger or context created by the serverless environment.
 *
 * @breadcrumb Core / Current Invoke
 * @public
 */
export type CurrentInvoke<TEvent, TContext> = {
  /**
   * The event created by the serverless trigger
   *
   * @remarks It's only null when you call {@link getCurrentInvoke} outside this library's pipeline.
   */
  event: TEvent | null;

  /**
   * The context created by the serverless environment
   *
   * @remarks It's only null when you call {@link getCurrentInvoke} outside this library's pipeline.
   */
  context: TContext | null;
};

const currentInvoke: CurrentInvoke<any, any> = {
  context: null,
  event: null,
};

/**
 * Get the reference to the event created by the serverless trigger or context created by the serverless environment.
 *
 * @example
 * ```typescript
 * import type { ALBEvent, Context } from 'aws-lambda';
 *
 * // inside the method that handles the aws alb request.
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
  return currentInvoke;
}

/**
 * Method that saves to the event created by the serverless trigger or context created by the serverless environment.
 *
 * @remarks This method MUST NOT be called by you, this method MUST only be used internally in this library.
 *
 * @param event - The event created by the serverless trigger
 * @param context - The context created by the serverless environment
 *
 * @breadcrumb Core / Current Invoke
 * @public
 */
export function setCurrentInvoke<TEvent = any, TContext = any>({
  event,
  context,
}: CurrentInvoke<TEvent, TContext>) {
  currentInvoke.event = event;
  currentInvoke.context = context;
}

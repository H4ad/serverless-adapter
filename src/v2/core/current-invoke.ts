export type CurrentInvoke<TEvent, TContext> = {
  event: TEvent | null;
  context: TContext | null;
};

const currentInvoke: CurrentInvoke<any, any> = {
  context: null,
  event: null,
};

export function getCurrentInvoke<TEvent = any, TContext = any>(): CurrentInvoke<
  TEvent,
  TContext
> {
  return currentInvoke;
}

export function setCurrentInvoke<TEvent = any, TContext = any>({
  event,
  context,
}: CurrentInvoke<TEvent, TContext>) {
  currentInvoke.event = event;
  currentInvoke.context = context;
}

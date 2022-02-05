const currentInvoke: { event: any | null; context: any | null } = {
  context: null,
  event: null,
};

export function getCurrentInvoke() {
  return currentInvoke;
}

export function setCurrentInvoke({ event, context }) {
  currentInvoke.event = event;
  currentInvoke.context = context;
}

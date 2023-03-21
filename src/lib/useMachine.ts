import { readable } from "svelte/store";
import { interpret, createMachine } from "xstate";

export function useMachine(machine, options) {
  const service = interpret(machine, options);

  const store = readable(service.initialState, (set) => {
    service.onTransition((state) => {
      set(state);
    });

    service.start();

    return () => {
      service.stop();
    };
  });

  return {
    state: store,
    send: service.send,
  };
}

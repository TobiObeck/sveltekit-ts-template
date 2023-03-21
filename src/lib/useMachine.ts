import { readable } from "svelte/store";
import { interpret, createMachine } from "xstate";
import type { InterpreterOptions } from "xstate";

// export function useMachine(machine, options) {
export function useMachine2(
  machine, //: ReturnType<typeof createMachine>,
  options?: InterpreterOptions
) {
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

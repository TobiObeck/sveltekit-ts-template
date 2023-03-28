import { createMachine, assign } from "xstate";

const schema = {
  context: {} as { count: number },
  events: {} as
    | {
        type: 'TOGGLE';
      }
};

export const toggleMachine = createMachine({
  // details about typegen: https://stately.ai/docs/xstate/typescript/typegen
  tsTypes: {} as import("./toggleMachine.typegen").Typegen0,
  schema,
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
  predictableActionArguments: true,
});

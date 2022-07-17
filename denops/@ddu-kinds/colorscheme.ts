import type { ActionArguments } from "https://deno.land/x/ddu_vim@v1.8.7/base/kind.ts";
import {
  ActionFlags,
  BaseKind,
} from "https://deno.land/x/ddu_vim@v1.8.7/types.ts";

export interface ActionData {
  name: string;
}

type Params = Record<never, never>;

export class Kind extends BaseKind<Params> {
  actions: Record<
    string,
    (args: ActionArguments<Params>) => Promise<ActionFlags>
  > = {
    set: async (args) => {
      for (const item of args.items) {
        const action = item?.action as ActionData;
        const name = action.name;
        await args.denops.cmd(`silent colorscheme ${name}`);
      }

      return Promise.resolve(ActionFlags.None);
    },
  };

  params(): Params {
    return {};
  }
}

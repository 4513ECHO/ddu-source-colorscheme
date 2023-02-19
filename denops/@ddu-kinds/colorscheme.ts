import { BaseKind } from "https://deno.land/x/ddu_vim@v2.3.0/base/kind.ts";
import {
  ActionFlags,
  type Actions,
} from "https://deno.land/x/ddu_vim@v2.3.0/types.ts";
import { background } from "https://deno.land/x/denops_std@v4.0.0/option/mod.ts";

export interface ActionData {
  name: string;
}

type Params = Record<never, never>;

export class Kind extends BaseKind<Params> {
  override actions: Actions<Params> = {
    async set(args) {
      const { name } = args.items.at(-1)?.action as ActionData;
      await args.denops.cmd(`silent colorscheme ${name}`);
      return Promise.resolve(ActionFlags.None);
    },
    async toggleBackground(args) {
      const bg = await background.get(args.denops);
      await background.set(args.denops, bg === "dark" ? "light" : "dark");
      return Promise.resolve(ActionFlags.Persist);
    },
  };

  override params(): Params {
    return {};
  }
}

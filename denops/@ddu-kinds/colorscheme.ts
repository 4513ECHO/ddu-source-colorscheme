import { BaseKind } from "jsr:@shougo/ddu-vim@^6.0.0/kind";
import { ActionFlags, type Actions } from "jsr:@shougo/ddu-vim@^6.0.0/types";
import { background } from "jsr:@denops/std@^7.1.1/option";

export type ActionData = {
  name: string;
};

type Params = Record<never, never>;

export class Kind extends BaseKind<Params> {
  actions: Actions<Params> = {
    async set(args) {
      const { name } = args.items.at(-1)?.action as ActionData;
      const { silent } = args.actionParams as { silent?: boolean };
      await args.denops.cmd(
        `${(silent ?? true) ? "silent" : ""} colorscheme ${name}`,
      );
      return ActionFlags.None;
    },
    async toggleBackground(args) {
      const bg = await background.get(args.denops);
      await background.set(args.denops, bg === "dark" ? "light" : "dark");
      return ActionFlags.Persist;
    },
  };

  params(): Params {
    return {};
  }
}

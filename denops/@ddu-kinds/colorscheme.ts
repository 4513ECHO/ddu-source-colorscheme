import { BaseKind } from "jsr:@shougo/ddu-vim@^6.2.0/kind";
import { ActionFlags, type Actions } from "jsr:@shougo/ddu-vim@^6.2.0/types";
import { background } from "jsr:@denops/std@^7.2.0/option";

export type ActionData = {
  name: string;
};

type Params = Record<PropertyKey, never>;

export class Kind extends BaseKind<Params> {
  override actions: Actions<Params> = {
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

  override params(): Params {
    return {};
  }
}

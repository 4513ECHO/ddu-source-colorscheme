import { BaseSource, type OnInitArguments } from "@shougo/ddu-vim/source";
import type { Item } from "@shougo/ddu-vim/types";
import type { ActionData } from "../../@ddu-kinds/colorscheme/main.ts";

type Params = Record<PropertyKey, never>;

export class Source extends BaseSource<Params, ActionData> {
  override kind = "colorscheme";
  #items: Item<ActionData>[] = [];

  override async onInit(args: OnInitArguments<Params>): Promise<void> {
    const colorschemes = await args.denops
      .call("getcompletion", "", "color") as string[];
    this.#items = colorschemes
      .map((word) => ({ word, action: { name: word } }));
  }

  override gather(): ReadableStream<Item<ActionData>[]> {
    return ReadableStream.from([this.#items]);
  }

  override params(): Params {
    return {};
  }
}

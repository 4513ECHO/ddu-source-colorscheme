import {
  BaseSource,
  type OnInitArguments,
} from "jsr:@shougo/ddu-vim@^6.2.0/source";
import type { Item } from "jsr:@shougo/ddu-vim@^6.2.0/types";
import type { ActionData } from "../@ddu-kinds/colorscheme.ts";

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

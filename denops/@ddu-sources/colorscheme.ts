import type { OnInitArguments } from "https://deno.land/x/ddu_vim@v2.8.4/base/source.ts";
import type { Item } from "https://deno.land/x/ddu_vim@v2.8.4/types.ts";
import { BaseSource } from "https://deno.land/x/ddu_vim@v2.8.4/types.ts";
import { ensureArray } from "https://deno.land/x/unknownutil@v2.1.1/mod.ts";
import type { ActionData } from "../@ddu-kinds/colorscheme.ts";

type Params = Record<never, never>;

export class Source extends BaseSource<Params, ActionData> {
  override kind = "colorscheme";
  #items: Item<ActionData>[] = [];

  override async onInit(args: OnInitArguments<Params>): Promise<void> {
    const colorschemes = await args.denops.call("getcompletion", "", "color");
    this.#items = ensureArray<string>(colorschemes)
      .map((word) => ({
        word,
        action: { name: word },
      }));
  }

  override gather(_args: unknown): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      start: (controller) => {
        controller.enqueue(this.#items);
        controller.close();
      },
    });
  }

  override params(): Params {
    return {};
  }
}

import {
  BaseSource,
  type OnInitArguments,
} from "https://deno.land/x/ddu_vim@v3.7.0/base/source.ts";
import type { Item } from "https://deno.land/x/ddu_vim@v3.7.0/types.ts";
import { ensure, is } from "https://deno.land/x/unknownutil@v3.11.0/mod.ts";
import type { ActionData } from "../@ddu-kinds/colorscheme.ts";

type Params = Record<never, never>;

export class Source extends BaseSource<Params, ActionData> {
  override kind = "colorscheme";
  #items: Item<ActionData>[] = [];

  override async onInit(args: OnInitArguments<Params>): Promise<void> {
    const colorschemes = await args.denops.call("getcompletion", "", "color");
    this.#items = ensure(colorschemes, is.ArrayOf(is.String))
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

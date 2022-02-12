import * as fn from "https://deno.land/x/denops_std@v3.0.0/function/mod.ts";
import * as op from "https://deno.land/x/denops_std@v3.0.0/option/mod.ts";
import type { GatherArguments } from "https://deno.land/x/ddu_vim@v0.12.2/base/source.ts";
import type { Item } from "https://deno.land/x/ddu_vim@v0.12.2/types.ts";
import { BaseSource } from "https://deno.land/x/ddu_vim@v0.12.2/types.ts";
import { ensureArray } from "https://deno.land/x/unknownutil@v1.1.4/mod.ts";
import { basename } from "https://deno.land/std@0.125.0/path/mod.ts";
import type { ActionData } from "../@ddu-kinds/colorscheme.ts";

type Params = Record<never, never>;

export class Source extends BaseSource<Params, ActionData> {
  kind = "colorscheme";

  gather(args: GatherArguments<Params>): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        const colorschemes = await fn.globpath(
          args.denops,
          await op.runtimepath.get(args.denops),
          "colors/*.vim",
          false,
          true,
        );
        ensureArray<string>(colorschemes);
        controller.enqueue(
          colorschemes.map((i) => {
            return {
              word: basename(i).split(".")[0],
              action: {
                name: basename(i).split(".")[0],
              },
            } as Item<ActionData>;
          }),
        );
        controller.close();
      },
    });
  }

  params(): Params {
    return {};
  }
}

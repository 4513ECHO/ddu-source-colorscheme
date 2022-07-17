import * as fn from "https://deno.land/x/denops_std@v3.3.2/function/mod.ts";
import * as op from "https://deno.land/x/denops_std@v3.3.2/option/mod.ts";
import type { GatherArguments } from "https://deno.land/x/ddu_vim@v1.8.7/base/source.ts";
import type { Item } from "https://deno.land/x/ddu_vim@v1.8.7/types.ts";
import { BaseSource } from "https://deno.land/x/ddu_vim@v1.8.7/types.ts";
import { ensureArray } from "https://deno.land/x/unknownutil@v2.0.0/mod.ts";
import { basename } from "https://deno.land/std@0.148.0/path/mod.ts";
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
              word: basename(i, ".vim"),
              action: {
                name: basename(i, ".vim"),
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

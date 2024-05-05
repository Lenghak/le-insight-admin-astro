import { type AutoformatPlugin } from "@udecode/plate-autoformat";
import { type PlatePlugin } from "@udecode/plate-common";

import { autoformatLists } from "./auto-format-lists";
import { autoformatRules } from "./auto-format-rules";

export const autoformatPlugin: Partial<PlatePlugin<AutoformatPlugin>> = {
  options: {
    rules: [...autoformatRules, ...autoformatLists] as any,
    enableUndoOnDelete: true,
  },
};

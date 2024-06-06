import type { ExitBreakPlugin } from "@udecode/plate-break";
import type { PlatePlugin } from "@udecode/plate-common";
import { KEYS_HEADING } from "@udecode/plate-heading";

export const exitBreakPlugin: Partial<PlatePlugin<ExitBreakPlugin>> = {
  options: {
    rules: [
      {
        hotkey: "mod+enter",
      },
      {
        hotkey: "mod+shift+enter",
        before: true,
      },
      {
        hotkey: "enter",
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING,
        },
        relative: true,
        level: 1,
      },
    ],
  },
};

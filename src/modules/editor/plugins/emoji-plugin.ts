import { EmojiCombobox } from "@plate-ui/emoji-combobox";

import type { PlatePlugin } from "@udecode/plate-common";
import type { EmojiPlugin } from "@udecode/plate-emoji";

export const emojiPlugin: Partial<PlatePlugin<EmojiPlugin>> = {
  renderAfterEditable: EmojiCombobox,
};

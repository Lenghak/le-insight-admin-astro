import type { AutoformatPlugin } from "@udecode/plate-autoformat";
import type { PlatePlugin } from "@udecode/plate-common";

import { autoformatLists } from "./auto-format-lists";
import { autoformatRules } from "./auto-format-rules";

export const autoformatPlugin: Partial<PlatePlugin<AutoformatPlugin>> = {
	options: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		rules: [...autoformatRules, ...autoformatLists] as any,
		enableUndoOnDelete: true,
	},
};

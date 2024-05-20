import type { ComboboxProps } from "@udecode/plate-combobox";
import { getPluginOptions, useEditorRef } from "@udecode/plate-common";
import {
	ELEMENT_MENTION,
	type MentionPlugin,
	getMentionOnSelectItem,
} from "@udecode/plate-mention";

import { Combobox } from "./combobox";

export function MentionCombobox({
	pluginKey = ELEMENT_MENTION,
	id = pluginKey,
	...props
}: Partial<ComboboxProps> & {
	pluginKey?: string;
}) {
	const editor = useEditorRef();

	const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey);

	return (
		<div onMouseDown={(e) => e.preventDefault()}>
			<Combobox
				id={id}
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				trigger={trigger!}
				controlled
				onSelectItem={getMentionOnSelectItem({
					key: pluginKey,
				})}
				{...props}
			/>
		</div>
	);
}

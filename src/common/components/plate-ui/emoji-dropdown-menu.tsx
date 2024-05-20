import {
	type EmojiDropdownMenuOptions,
	useEmojiDropdownMenuState,
} from "@udecode/plate-emoji";
import { SmileIcon } from "lucide-react";

import { emojiCategoryIcons, emojiSearchIcons } from "./emoji-icons";
import { EmojiPicker } from "./emoji-picker";
import { EmojiToolbarDropdown } from "./emoji-toolbar-dropdown";
import { ToolbarButton } from "./toolbar";

type EmojiDropdownMenuProps = {
	options?: EmojiDropdownMenuOptions;
} & React.ComponentPropsWithoutRef<typeof ToolbarButton>;

export function EmojiDropdownMenu({
	options,
	...props
}: EmojiDropdownMenuProps) {
	const { isOpen, setIsOpen, emojiPickerState } =
		useEmojiDropdownMenuState(options);

	return (
		<EmojiToolbarDropdown
			control={
				<ToolbarButton pressed={isOpen} isDropdown tooltip="Emoji" {...props}>
					<SmileIcon className="size-4" />
				</ToolbarButton>
			}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<EmojiPicker
				{...emojiPickerState}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				icons={{
					categories: emojiCategoryIcons,
					search: emojiSearchIcons,
				}}
				settings={options?.settings}
			/>
		</EmojiToolbarDropdown>
	);
}

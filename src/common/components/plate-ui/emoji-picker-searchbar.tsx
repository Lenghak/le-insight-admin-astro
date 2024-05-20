import type { UseEmojiPickerType } from "@udecode/plate-emoji";
import type { ReactNode } from "react";

export type EmojiPickerSearchBarProps = {
	children: ReactNode;
} & Pick<UseEmojiPickerType, "i18n" | "searchValue" | "setSearch">;

export function EmojiPickerSearchBar({
	i18n,
	searchValue,
	setSearch,
	children,
}: EmojiPickerSearchBarProps) {
	return (
		<div className="flex items-center px-2">
			<div className="relative flex grow items-center">
				<input
					type="text"
					placeholder={i18n.search}
					autoComplete="off"
					aria-label="Search"
					className="block w-full appearance-none rounded-full border-0 bg-accent px-10 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:outline-none"
					onChange={(event) => setSearch(event.target.value)}
					value={searchValue}
				/>
				{children}
			</div>
		</div>
	);
}

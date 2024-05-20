import { Button } from "@/common/components/ui/button";

import { cn } from "@udecode/cn";
import type { UseEmojiPickerType } from "@udecode/plate-emoji";
import { DeleteIcon, SearchIcon } from "lucide-react";

export type EmojiPickerSearchAndClearProps = Pick<
	UseEmojiPickerType,
	"i18n" | "searchValue" | "clearSearch"
>;

export function EmojiPickerSearchAndClear({
	i18n,
	searchValue,
	clearSearch,
}: EmojiPickerSearchAndClearProps) {
	return (
		<div className="flex items-center">
			<div
				className={cn(
					"absolute left-3 top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center",
				)}
			>
				<SearchIcon className="size-4" />
			</div>
			{searchValue && (
				<Button
					variant={"ghost"}
					size={"icon"}
					title={i18n.clear}
					aria-label="Clear"
					type="button"
					className={cn(
						"absolute right-1 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent",
					)}
					onClick={clearSearch}
				>
					<DeleteIcon className="size-4" />
				</Button>
			)}
		</div>
	);
}

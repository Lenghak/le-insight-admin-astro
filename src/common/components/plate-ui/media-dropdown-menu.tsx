import {
	EDITOR_IMAGE_DIALOG_ID,
	EDITOR_MEDIA_DIALOG_ID,
} from "@editor/constants/dailogs-keys";
import { setMediaDialogState } from "@editor/stores/upload-dialog-store";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { insertEmptyElement, useEditorRef } from "@udecode/plate-common";
import { BrushIcon, ImageIcon, PaperclipIcon } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function MediaDropdownMenu(props: DropdownMenuProps) {
	const editor = useEditorRef();
	const openState = useOpenState();

	return (
		<DropdownMenu modal={false} {...openState} {...props}>
			<DropdownMenuTrigger asChild>
				<ToolbarButton pressed={openState.open} tooltip="Media" isDropdown>
					<ImageIcon className="size-4" />
				</ToolbarButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="start"
				className="flex w-[180px] min-w-0 flex-col gap-0.5"
			>
				<DropdownMenuItem
					className="flex items-center gap-4 font-semibold"
					onClick={() => {
						setMediaDialogState({
							id: EDITOR_IMAGE_DIALOG_ID,
							isOpen: true,
						});
					}}
				>
					<ImageIcon className="size-4" />
					<span>Image</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="flex items-center gap-4 font-semibold"
					onClick={() => {
						setMediaDialogState({
							id: EDITOR_MEDIA_DIALOG_ID,
							isOpen: true,
						});
					}}
				>
					<PaperclipIcon className="size-4" />
					<span className="text-sm">Embeded</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="flex items-center gap-4 font-semibold"
					onClick={() => {
						insertEmptyElement(editor, "ELEMENT_EXCALIDRAW", {
							select: true,
							nextBlock: true,
						});
					}}
				>
					<BrushIcon className="size-4" />
					<span className="text-sm">Excalidraw</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

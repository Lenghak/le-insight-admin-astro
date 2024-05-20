import { withRef } from "@udecode/cn";
import {
	ListStyleType,
	useIndentListToolbarButton,
	useIndentListToolbarButtonState,
} from "@udecode/plate-indent-list";
import { ListIcon, ListOrderedIcon } from "lucide-react";

import { ToolbarButton } from "./toolbar";

export const IndentListToolbarButton = withRef<
	typeof ToolbarButton,
	{
		nodeType?: ListStyleType;
	}
>(({ nodeType = ListStyleType.Disc }, ref) => {
	const state = useIndentListToolbarButtonState({ nodeType });
	const { props } = useIndentListToolbarButton(state);

	return (
		<ToolbarButton
			ref={ref}
			tooltip={
				nodeType === ListStyleType.Disc ? "Bulleted List" : "Numbered List"
			}
			size={"icon"}
			{...props}
		>
			{nodeType === ListStyleType.Disc ? (
				<ListIcon className="size-4" />
			) : (
				<ListOrderedIcon className="size-4" />
			)}
		</ToolbarButton>
	);
});

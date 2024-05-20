import { withRef } from "@udecode/cn";
import {
	useLinkToolbarButton,
	useLinkToolbarButtonState,
} from "@udecode/plate-link";
import { LinkIcon } from "lucide-react";

import { ToolbarButton } from "./toolbar";

export const LinkToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
	const state = useLinkToolbarButtonState();
	const { props } = useLinkToolbarButton(state);

	return (
		<ToolbarButton ref={ref} tooltip="Link" {...props} {...rest}>
			<LinkIcon className="size-4" />
		</ToolbarButton>
	);
});

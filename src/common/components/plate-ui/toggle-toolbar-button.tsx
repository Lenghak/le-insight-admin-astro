import { withRef } from "@udecode/cn";
import {
  useToggleToolbarButton,
  useToggleToolbarButtonState,
} from "@udecode/plate-toggle";
import { ChevronDownIcon } from "lucide-react";

import { ToolbarButton } from "./toolbar";

export const ToggleToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const state = useToggleToolbarButtonState();
    const { props } = useToggleToolbarButton(state);

    return (
      <ToolbarButton
        ref={ref}
        tooltip="Toggle"
        {...props}
        {...rest}
      >
        <ChevronDownIcon className="size-4" />
      </ToolbarButton>
    );
  },
);

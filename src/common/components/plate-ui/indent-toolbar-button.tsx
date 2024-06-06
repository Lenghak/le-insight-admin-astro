import { withRef } from "@udecode/cn";
import { useIndentButton } from "@udecode/plate-indent";
import { IndentIcon } from "lucide-react";

import { ToolbarButton } from "./toolbar";

export const IndentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useIndentButton();

    return (
      <ToolbarButton
        ref={ref}
        tooltip="Indent"
        {...props}
        {...rest}
      >
        <IndentIcon className="size-4" />
      </ToolbarButton>
    );
  },
);

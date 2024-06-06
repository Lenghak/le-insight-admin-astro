import { withRef } from "@udecode/cn";
import { useOutdentButton } from "@udecode/plate-indent";
import { OutdentIcon } from "lucide-react";

import { ToolbarButton } from "./toolbar";

export const OutdentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useOutdentButton();

    return (
      <ToolbarButton
        ref={ref}
        tooltip="Outdent"
        {...props}
        {...rest}
      >
        <OutdentIcon className="size-4" />
      </ToolbarButton>
    );
  },
);

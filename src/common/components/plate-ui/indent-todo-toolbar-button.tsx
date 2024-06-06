import {
  useIndentTodoToolBarButton,
  useIndentTodoToolBarButtonState,
} from "@udecode/plate-indent-list";
import { withRef } from "@udecode/react-utils";
import { SquareIcon } from "lucide-react";

import { ToolbarButton } from "./toolbar";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const IndentTodoToolbarButton = withRef<typeof ToolbarButton>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (rest: any, ref: any) => {
    const state = useIndentTodoToolBarButtonState({ nodeType: "todo" });
    const { props } = useIndentTodoToolBarButton(state);

    return (
      <ToolbarButton
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ref={ref}
        tooltip="Todo"
        {...props}
        {...rest}
      >
        <SquareIcon className="size-4" />
      </ToolbarButton>
    );
  },
);

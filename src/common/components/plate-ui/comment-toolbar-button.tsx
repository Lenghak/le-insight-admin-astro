import { useCommentAddButton } from "@udecode/plate-comments";
import { MessageSquarePlusIcon } from "lucide-react";

import { ToolbarButton } from "./toolbar";

export function CommentToolbarButton() {
  const { hidden, props } = useCommentAddButton();

  if (hidden) return null;

  return (
    <ToolbarButton
      tooltip="Comment (⌘+⇧+M)"
      size={"icon"}
      {...props}
    >
      <MessageSquarePlusIcon className="size-4" />
    </ToolbarButton>
  );
}

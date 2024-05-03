import { useCommentAddButton } from "@udecode/plate-comments";
import { MessageCirclePlusIcon } from "lucide-react";

import { ToolbarButton } from "./toolbar";

export function CommentToolbarButton() {
  const { hidden, props } = useCommentAddButton();

  if (hidden) return null;

  return (
    <ToolbarButton
      tooltip="Comment (⌘+⇧+M)"
      {...props}
    >
      <MessageCirclePlusIcon className="size-4" />
    </ToolbarButton>
  );
}

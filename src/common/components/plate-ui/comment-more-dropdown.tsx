import { cn } from "@udecode/cn";
import {
  useCommentDeleteButton,
  useCommentDeleteButtonState,
  useCommentEditButton,
  useCommentEditButtonState,
} from "@udecode/plate-comments";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function CommentMoreDropdown() {
  const editButtonState = useCommentEditButtonState();
  const { props: editProps } = useCommentEditButton(editButtonState);
  const deleteButtonState = useCommentDeleteButtonState();
  const { props: deleteProps } = useCommentDeleteButton(deleteButtonState);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("h-6 p-1 font-semibold text-muted-foreground")}
        >
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem {...editProps}>Edit comment</DropdownMenuItem>
        <DropdownMenuItem {...deleteProps}>Delete comment</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { cn } from "@udecode/cn";
import {
  CommentResolveButton as CommentResolveButtonPrimitive,
  useComment,
} from "@udecode/plate-comments";
import { Check, RefreshCcwIcon } from "lucide-react";

import { buttonVariants } from "./button";

export function CommentResolveButton() {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const comment = useComment()!;

  return (
    <CommentResolveButtonPrimitive
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "h-6 p-1 text-muted-foreground",
      )}
    >
      {comment.isResolved ? (
        <RefreshCcwIcon className="size-4" />
      ) : (
        <Check className="size-4" />
      )}
    </CommentResolveButtonPrimitive>
  );
}

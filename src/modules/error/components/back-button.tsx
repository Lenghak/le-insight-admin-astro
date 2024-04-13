import { buttonVariants } from "@/common/components/ui/button";

import { cn } from "@/common/lib/utils";

import { MoveLeftIcon } from "lucide-react";

export function BackButton() {
  return (
    <a
      href="/"
      className={cn(
        buttonVariants({ size: "lg", variant: "default" }),
        "items-center gap-2 rounded-full font-bold",
      )}
    >
      <MoveLeftIcon size={18} />
      <span>Go back</span>
    </a>
  );
}

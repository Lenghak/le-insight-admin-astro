import { buttonVariants } from "@/common/components/ui/button";

import { cn } from "@/common/lib/utils";

import { MoveLeftIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

type Props = {
  className?: string;
  href?: string;
  variant?: "default" | "outline"
} & PropsWithChildren;

export function BackButton({ className, children, href, variant }: Props) {
  return (
    <a
      href={href ?? "/spa/dashboard/users"}
      target="_parent"
      className={cn(
        buttonVariants({ size: "lg", variant }),
        "items-center gap-3 rounded-full font-bold",
        className,
      )}
    >
      {children ?? (
        <>
          <MoveLeftIcon size={18} />
          <span>Go back</span>
        </>
      )}
    </a>
  );
}

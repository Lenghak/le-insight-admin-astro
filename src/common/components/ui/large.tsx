import { cn } from "@/common/lib/utils";

import { forwardRef, type HTMLAttributes } from "react";

type LargeProps = HTMLAttributes<HTMLSpanElement>;

export const Large = forwardRef<HTMLSpanElement, LargeProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        className={cn("text-lg font-semibold", className)}
        {...props}
        ref={ref}
      >
        {children}
      </span>
    );
  },
);

Large.displayName = "Large";

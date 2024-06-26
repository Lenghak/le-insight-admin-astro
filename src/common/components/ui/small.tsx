import { cn } from "@/common/lib/utils";

import { forwardRef, type HTMLAttributes } from "react";

type SmallProps = HTMLAttributes<HTMLSpanElement>;

export const Small = forwardRef<HTMLSpanElement, SmallProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <small
        className={cn("text-sm font-medium leading-5", className)}
        {...props}
        ref={ref}
      >
        {children}
      </small>
    );
  },
);

Small.displayName = "Small";

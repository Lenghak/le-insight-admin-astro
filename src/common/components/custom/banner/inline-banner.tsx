import { Muted } from "@/common/components/ui/muted";

import { cn } from "@/common/lib/utils";

import React, {
  forwardRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";

type Props = PropsWithChildren & {
  title?: React.ReactNode;
  icon?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default forwardRef<HTMLDivElement, Props>(
  ({ title, icon, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full items-start gap-6", className)}
        {...props}
      >
        {icon ? (
          <div className="mt-1 h-fit w-fit rounded-full">{icon}</div>
        ) : undefined}
        <div className="flex w-full flex-col justify-center gap-1 text-sm italic">
          <Muted className="font-bold not-italic">{title}</Muted>
          {children}
        </div>
      </div>
    );
  },
);

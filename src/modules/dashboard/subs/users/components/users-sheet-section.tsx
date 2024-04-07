import { Muted } from "@/common/components/ui/muted";

import { cn } from "@/common/lib/utils";

import type { HTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  title: React.ReactNode;
  description: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function UsersSheetSection({
  title,
  description,
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 grid-rows-1 items-start justify-between gap-4",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col">
        <span className="font-bold">{title}</span>
        <Muted>{description}</Muted>
      </div>

      {children}
    </div>
  );
}

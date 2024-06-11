import { Muted } from "@/common/components/ui/muted";

import { cn } from "@/common/lib/utils";

import type { HTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    label: React.ReactNode;
  };

export default function ArticleInfoItem({
  label,
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn("flex items-start justify-between font-bold", className)}
      {...props}
    >
      {typeof label === "string" ? (
        <Muted className="text-sm w-1/2">{label}</Muted>
      ) : (
        label
      )}
      {children}
    </div>
  );
}

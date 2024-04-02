import { cn } from "@/common/lib/utils";

import type { HTMLAttributes } from "react";

type DashboardTabProps = {
  className?: string;
  activeFn?: () => boolean;
  href?: string;
  link?: boolean;
  pathname?: string;
} & HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>;

export default function DashboardTab({
  className,
  children,
  activeFn,
  href,
  link,
  pathname,
  ...props
}: DashboardTabProps) {
  const isActive = activeFn ? activeFn() : pathname === href;

  const Comp = link ? "a" : "button";

  return (
    <Comp
      {...props}
      href={href}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:font-bold data-[state=active]:shadow-sm",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

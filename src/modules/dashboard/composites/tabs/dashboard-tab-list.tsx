import { cn } from "@/common/lib/utils";

type DashboardTabList = {
  className?: string;
  children?: React.ReactNode;
};

export default function DashboardTabList({
  className,
  children,
}: DashboardTabList) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

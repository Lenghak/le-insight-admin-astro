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
        "flex h-10 items-center justify-center rounded-md bg-muted text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

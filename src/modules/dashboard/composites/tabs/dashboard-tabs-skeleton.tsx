import { Skeleton } from "@/common/components/ui/skeleton";

import { useId } from "react";

export default function DashboardTabsSkeletons({
  count = 3,
}: {
  count: number;
}) {
  return (
    <div className="mt-4 flex items-center justify-start gap-2">
      {Array(count)
        .fill(null)
        .map((_) => (
          <Skeleton
            key={useId()}
            className="h-8 w-12 rounded-full"
          />
        ))}
    </div>
  );
}

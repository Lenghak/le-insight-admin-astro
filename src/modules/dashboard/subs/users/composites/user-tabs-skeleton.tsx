import { Skeleton } from "@/common/components/ui/skeleton";

export default function UserTabsSkeletons() {
  return (
    <div className="mt-4 flex items-center justify-start gap-4">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <Skeleton
            key={index}
            className="h-8 w-12 rounded-lg"
          />
        ))}
    </div>
  );
}

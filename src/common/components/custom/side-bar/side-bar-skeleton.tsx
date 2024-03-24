import { Separator } from "@/common/components/ui/separator";
import { Skeleton } from "@/common/components/ui/skeleton";

export default function SidebarSkeleton() {
  return (
    <aside
      className={
        "relative row-span-full w-16 bg-card transition-all ease-in-out"
      }
    >
      <div className={"flex h-16 items-center justify-center px-2"}>
        <Skeleton className="h-10 min-h-10 w-10 min-w-10" />
      </div>

      <Separator className="mx-auto h-[0.03rem] w-4/5" />

      <div className="group flex w-full flex-col gap-4 py-8">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-full"
            />
          ))}
      </div>

      <Separator className="mx-auto h-[0.03rem] w-4/5" />

      <div className="group flex w-full flex-col gap-4 py-8">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-full"
            />
          ))}
      </div>

      <Separator className="mx-auto h-[0.03rem] w-4/5" />

      <div className="group flex w-full flex-col gap-4 py-8">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-full"
            />
          ))}
      </div>
    </aside>
  );
}

import { Skeleton } from "@/common/components/ui/skeleton";

import { Fragment } from "react";

export default function EditorSkeleton() {
  return (
    <Fragment>
      {/* Toolbars Skeleton */}
      <div className="px-12 fixed left-auto flex items-center justify-center gap-4 top-8 mx-auto h-fit min-h-14 w-[calc(100%_-_6rem)] place-self-center self-center overflow-y-hidden rounded-xl p-1.5">
        {Array(8)
          .fill(false)
          .map((_, index) => (
            <Skeleton
              className="h-8 w-full gap-4 rounded-full"
              key={index}
            />
          ))}
      </div>

      {/* Editor */}
      <div className="flex flex-col gap-2 w-full h-full mt-48 px-24">
        <Skeleton className="h-6 rounded-full w-36" />
        <Skeleton className="h-6 rounded-full w-1/5" />
      </div>
    </Fragment>
  );
}

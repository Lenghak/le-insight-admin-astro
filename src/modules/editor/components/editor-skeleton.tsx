import { Skeleton } from "@/common/components/ui/skeleton";

import { Fragment, useId } from "react";

export default function EditorSkeleton() {
	return (
		<Fragment>
			{/* Toolbars Skeleton */}
			<div className="fixed left-auto top-8 mx-auto flex h-fit min-h-14 w-[calc(100%_-_6rem)] items-center justify-center gap-4 place-self-center self-center overflow-y-hidden rounded-xl p-1.5 px-12">
				{Array(8)
					.fill(false)
					.map((_) => (
						<Skeleton className="h-8 w-full gap-4 rounded-full" key={useId()} />
					))}
			</div>

			{/* Editor */}
			<div className="mt-48 flex h-full w-full flex-col gap-2 px-24">
				<Skeleton className="h-6 w-36 rounded-full" />
				<Skeleton className="h-6 w-1/5 rounded-full" />
			</div>
		</Fragment>
	);
}

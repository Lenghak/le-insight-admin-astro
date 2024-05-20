import { DialogContent, DialogFooter, DialogHeader } from "@ui/dialog";
import { Skeleton } from "@ui/skeleton";

export default function DashboardDialogFormSkeleton() {
	return (
		<DialogContent className="w-full bg-card">
			<DialogHeader>
				<Skeleton className="h-4 w-32 rounded-full" />
				<Skeleton className="h-4 w-3/4 rounded-full" />
			</DialogHeader>

			<section className="mt-8 w-full space-y-8">
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-24 rounded-full" />
					<Skeleton className="h-8 w-full rounded-full" />
				</div>

				<div className="flex w-full items-center justify-between gap-8">
					<div className="flex w-full flex-col gap-2">
						<Skeleton className="h-4 w-24 rounded-full" />
						<Skeleton className="h-8 w-full rounded-full" />
					</div>

					<div className="flex w-full flex-col gap-2">
						<Skeleton className="h-4 w-24 rounded-full" />
						<Skeleton className="h-8 w-full rounded-full" />
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-24 rounded-full" />
					<Skeleton className="h-8 w-full rounded-full" />
				</div>

				<DialogFooter className="gap-2">
					<Skeleton className="h-8 w-24 rounded-full" />
					<Skeleton className="h-8 w-24 rounded-full" />
				</DialogFooter>
			</section>
		</DialogContent>
	);
}

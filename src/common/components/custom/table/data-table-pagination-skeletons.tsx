import { Skeleton } from "@/common/components/ui/skeleton";

export default function DataTablePaginationSkeleton() {
	return (
		<section className={"flex items-center justify-between pt-2"}>
			<Skeleton className="h-8 w-56 rounded-full" />

			<Skeleton className="h-8 w-12 rounded-full" />

			<Skeleton className="h-8 w-56 rounded-full" />
		</section>
	);
}

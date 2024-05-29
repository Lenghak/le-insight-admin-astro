import ErrorSection from "@/modules/error/components/error-section";

import ArticlesCard from "@articles/composites/articles-card";
import type { ArticlesListDataType } from "@articles/types/articles-list-type";

import { OrigamiIcon } from "lucide-react";

export default function ArticleDataList({
	articles,
}: {
	articles?: ArticlesListDataType[];
}) {
	return (
		<section className="grid-rows-auto grid h-full w-full grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-2 pb-4 divide">
			{articles?.length && articles?.length > 0
				? articles?.map((ac) => (
						<ArticlesCard
							article={ac}
							key={ac.id}
							className="w-full bg-card transition-all hover:bg-card hover:shadow-lg dark:hover:bg-secondary/80"
						/>
					))
				: undefined}

			{!articles?.length && (
				<ErrorSection
					img={<OrigamiIcon size={96} strokeWidth={2} className="mb-4" />}
					title="No article found!"
					className="col-span-full row-span-full h-[50vh]"
					description="There's no article right now. Stay tune or browse more keywords for better results."
				/>
			)}

			{/* Intersection Observer */}
		</section>
	);
}

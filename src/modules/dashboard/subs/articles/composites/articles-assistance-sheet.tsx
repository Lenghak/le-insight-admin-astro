import { cn } from "@/common/lib/utils";
import { $articleAiPanelCollapseStore } from "@/modules/dashboard/subs/articles/stores/article-ai-store";
import ErrorSection from "@/modules/error/components/error-section";
import { useStore } from "@nanostores/react";

import { H3 } from "@ui/h3";

import { SparklesIcon } from "lucide-react";

export default function ArticlesAssistanceSheet() {
	const isCollapsed = useStore($articleAiPanelCollapseStore);

	return (
		<section
			className={cn(
				"bg-card h-full flex items-start justify-start p-6",
				isCollapsed ? "w-0 opacity-0" : "w-full opacity-100",
			)}
		>
			<ErrorSection
				img={<SparklesIcon size={64} strokeWidth={2} className="mb-6" />}
				title={
					<H3 className="font-extrabold text-center">
						Suggestions will appear here
					</H3>
				}
				className="col-span-full row-span-full h-full text-center w-full"
				description="Select a range of text associate with our tools here, and see if it fits your satisfaction."
			/>
		</section>
	);
}

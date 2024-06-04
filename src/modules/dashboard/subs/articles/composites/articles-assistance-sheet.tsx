import ErrorSection from "@/modules/error/components/error-section";
import usePostEnhanceArticlesService from "@articles/hooks/use-post-enhance-articles-service";
import {
	$articleAiPanelCollapseStore,
	$articleAiResultStore,
} from "@articles/stores/article-ai-store";
import { ArticlesEnhanceRequestSchema } from "@articles/types/articles-enhance-type";
import {
	$aiEnhanceStore,
	setAIEnhance,
} from "@dashboard/stores/ai-enhance-store";

import { cn } from "@/common/lib/utils";
import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { H3 } from "@ui/h3";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import {
	ChevronLeftIcon,
	Loader2Icon,
	RefreshCwIcon,
	SparklesIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EnhanceSchema = z.object({
	content: ArticlesEnhanceRequestSchema.shape.content,
	path: z.string(),
});

export default function ArticlesAssistanceSheet() {
	const isCollapsed = useStore($articleAiPanelCollapseStore);
	const enhanceObject = useStore($aiEnhanceStore);
	const aiProgress = useStore($articleAiResultStore);

	const form = useForm<z.infer<typeof EnhanceSchema>>({
		resolver: zodResolver(EnhanceSchema),
		defaultValues: {
			content: enhanceObject.body,
			path: "/content",
		},
	});

	const { mutate: enhanceArticle, isPending } = usePostEnhanceArticlesService();

	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		form.setValue("content", enhanceObject.body);

		if (enhanceObject.path) form.setValue("path", enhanceObject.path);

		if (enhanceObject.trigger) {
			buttonRef.current?.click();
			setAIEnhance({ ...enhanceObject, trigger: false });
		}
	}, [enhanceObject]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((values) => {
					enhanceArticle({
						content: values.content,
						path: values.path,
					});
				})}
				className={cn(
					"relative h-full flex items-start justify-start p-6 pt-32 min-w-96 overflow-y-auto",
					isCollapsed ? "w-0 opacity-0" : "w-full opacity-100",
				)}
			>
				<Button
					type="button"
					variant={"ghost"}
					className="items-center absolute top-16 left-4"
					onClick={() => $articleAiPanelCollapseStore.set(true)}
				>
					<ChevronLeftIcon className="size-5 mr-4" />
					<span className="font-bold">Hide Assistant</span>
				</Button>

				{aiProgress.output.length ? (
					<div className="transition-all font-serif text-base font-semibold">
						{aiProgress.output}
					</div>
				) : (
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
				)}

				{form.formState.submitCount > 0 && (
					<Button
						ref={buttonRef}
						type={isPending ? "button" : "submit"}
						className={cn(
							"group absolute bottom-4 right-4 gap-0 px-6 font-bold transition-all",
							isPending ? "pl-6" : "",
						)}
						disabled={isPending}
					>
						<RefreshCwIcon
							className={cn(
								"h-4 w-0 group-hover:rotate-[360deg] duration-700 transition-all",
								isPending ? "hidden" : "w-4 mr-4",
							)}
						/>
						<Loader2Icon
							className={cn(
								"h-4 w-0 animate-spin transition-all",
								isPending ? "w-4 mr-4" : "hidden",
							)}
						/>
						Run Again
					</Button>
				)}
			</form>
		</Form>
	);
}

import { cn } from "@/common/lib/utils";
import ErrorSection from "@/modules/error/components/error-section";
import AiMessageCard from "@articles/components/ai-message-card";
import usePostEnhanceArticlesService from "@articles/hooks/use-post-enhance-articles-service";
import {
	$articleAiPanelCollapseStore,
	$articleAiResultStore,
} from "@articles/stores/article-ai-store";
import { ArticlesEnhanceRequestSchema } from "@articles/types/articles-enhance-type";
import { AiDropdownMenu } from "@dashboard/composites/ai/ai-dropdown-menu";
import {
	$aiEnhanceStore,
	setAIEnhance,
} from "@dashboard/stores/ai-enhance-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { inputVariants } from "@plate-ui/input";
import { TextareaAutosize } from "@udecode/plate-caption";
import {
	insertText,
	useEditorRef,
	useEditorSelection,
} from "@udecode/plate-common";
import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { H3 } from "@ui/h3";
import { Small } from "@ui/small";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";

import {
	AlertTriangleIcon,
	BotMessageSquareIcon,
	ChevronLeftIcon,
	CopyCheckIcon,
	CopyIcon,
	Loader2Icon,
	Repeat2Icon,
	SparklesIcon,
	User2Icon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const EnhanceSchema = z.object({
	content: ArticlesEnhanceRequestSchema.shape.content,
	path: z.string(),
});

export default function ArticlesAssistanceSheet() {
	const isCollapsed = useStore($articleAiPanelCollapseStore);
	const enhanceObject = useStore($aiEnhanceStore);
	const aiProgress = useStore($articleAiResultStore);

	const [isCopiedToClipboard, setCopiedToClipboard] = useState(false);

	const form = useForm<z.infer<typeof EnhanceSchema>>({
		resolver: zodResolver(EnhanceSchema),
		defaultValues: {
			content: enhanceObject.body,
			path: "/content",
		},
	});

	const {
		mutate: enhanceArticle,
		isPending,
		isError,
	} = usePostEnhanceArticlesService();

	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleCopyOutput = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedToClipboard(true);
			toast.success("Text copied to clipboard.", {
				onAutoClose: () => {
					setCopiedToClipboard(false);
				},
			});
		});
	};

	const editor = useEditorRef();
	const selected = useEditorSelection();

	useEffect(() => {
		if (enhanceObject.body) form.setValue("content", enhanceObject.body);
		if (enhanceObject.path) form.setValue("path", enhanceObject.path);

		if (enhanceObject.trigger) {
			buttonRef.current?.click();
			$articleAiResultStore.set({ output: "" });
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
					"bg-card dark:bg-transparent relative h-full flex flex-col items-start justify-start min-w-96 overflow-y-hidden pt-14",
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
				{isPending ||
				aiProgress.output ||
				isError ||
				form.formState.submitCount ? (
					<div
						className={cn(
							"transition-all text-base font-semibold w-full h-full max-w-full overflow-y-auto pt-12 pb-6 px-6 scroll-mt-32 scroll-smooth gap-6",
							"flex flex-col items-center justify-start",
						)}
					>
						<AiMessageCard
							className="self-end text-end text-wrap flex flex-col items-end"
							title={
								<div className="flex items-center gap-4 whitespace-nowrap">
									<span>{enhanceObject.title ?? "User Request"}</span>
									<User2Icon className="size-4" />
								</div>
							}
						>
							<div className="p-2 px-4 bg-background dark:bg-card rounded-3xl w-fit flex">
								{form.getValues("content")}
							</div>
						</AiMessageCard>

						<AiMessageCard
							className="self-start text-wrap"
							title={
								<div className="flex items-center gap-4 whitespace-nowrap">
									<BotMessageSquareIcon className="size-4" />
									<span>Assistant Response</span>
								</div>
							}
							actions={
								<div
									className={cn("flex items-center justify-start w-full gap-2")}
								>
									<Button
										type="button"
										variant={"outline"}
										className={cn("bg-transparent dark:bg-card relative")}
										disabled={isPending || aiProgress.output.length === 0}
										size={"sm"}
										onClick={() =>
											insertText(editor, aiProgress.output, { at: selected })
										}
									>
										<span className="font-bold">Insert</span>
									</Button>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												type="button"
												variant={"outline"}
												className={cn(
													"size-9 bg-transparent dark:bg-card relative",
												)}
												disabled={isPending || aiProgress.output.length === 0}
												size={"icon"}
												onClick={() => handleCopyOutput(aiProgress.output)}
											>
												<CopyIcon
													className={cn(
														"size-4 transition-all absolute",
														isCopiedToClipboard ? "scale-0" : "scale-1",
													)}
												/>

												<CopyCheckIcon
													className={cn(
														"size-4 transition-all absolute",
														isCopiedToClipboard ? "scale-1" : "scale-0",
													)}
												/>
												<span className="sr-only">Copy</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Copy</p>
										</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												type={isPending ? "button" : "submit"}
												variant={"default"}
												size={"icon"}
												className={cn(
													"size-9 group gap-0 font-bold transition-all",
												)}
												disabled={isPending}
											>
												<Repeat2Icon
													className={cn(
														"h-4 w-0 group-hover:rotate-[360deg] duration-700 transition-all",
														isPending ? "hidden" : "w-4",
													)}
												/>
												<Loader2Icon
													className={cn(
														"h-4 w-0 animate-spin transition-all",
														isPending ? "w-4" : "hidden",
													)}
												/>
												<span className="sr-only">Run Again</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Run Again</p>
										</TooltipContent>
									</Tooltip>
								</div>
							}
						>
							{isError ? (
								<div className="text-destructive bg-destructive/10 py-3 px-5 rounded-3xl flex items-center">
									<AlertTriangleIcon className="size-5 min-w-5 mr-4" />
									<Small className="font-bold">
										There was a problem getting your response!
									</Small>
								</div>
							) : aiProgress.output?.length ? (
								<div className="py-3 px-5 bg-background dark:bg-card rounded-3xl w-fit flex">
									{aiProgress.output}
								</div>
							) : (
								<div className="py-3 px-5 bg-background dark:bg-card rounded-3xl w-fit flex animate-pulse">
									{!isPending
										? "The response is empty. Please try again."
										: "Working on your request..."}
								</div>
							)}
						</AiMessageCard>
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

				<Button type="submit" className="invisible absolute" ref={buttonRef}>
					<span className="sr-only">Submit</span>
				</Button>

				<div className="flex items-end justify-end gap-6 w-full self-end p-6">
					<TextareaAutosize
						onChange={(e) => form.setValue("content", e.currentTarget.value)}
						className={cn(
							"min-h-10 h-10 max-h-48 w-full font-semibold",
							inputVariants({ variant: "default" }),
							"rounded-3xl px-4 resize-none",
						)}
						placeholder="Type some message..."
					/>

					<AiDropdownMenu
						trigger={
							<Button
								type="button"
								variant={"default"}
								className="size-9 min-w-9 relative"
								size={"icon"}
							>
								<SparklesIcon className="size-4" />
								<span className="sr-only">Change AI</span>
							</Button>
						}
					/>
				</div>
			</form>
		</Form>
	);
}

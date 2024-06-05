import { $articleAiPanelCollapseStore } from "@articles/stores/article-ai-store";
import {
	AIEnhanceTools,
	AiToneTools,
} from "@dashboard/constants/ai-tools-constants";
import {
	$aiEnhanceStore,
	setAIEnhance,
} from "@dashboard/stores/ai-enhance-store";
import { useStore } from "@nanostores/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	useOpenState,
} from "@plate-ui/dropdown-menu";
import { ToolbarButton } from "@plate-ui/toolbar";
import type { DropdownMenuProps as PrimitiveDropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { cn } from "@udecode/cn";
import { getSelectionText, useEditorRef } from "@udecode/plate-common";
import { Small } from "@ui/small";
import { SparklesIcon, SpeechIcon } from "lucide-react";
import { Fragment, useId } from "react";

interface DropdownMenuProps extends PrimitiveDropdownMenuProps {
	triggerClassName?: string;
	isDropdown?: boolean;
	trigger?: React.ReactNode;
}

export function AiDropdownMenu({ trigger, ...props }: DropdownMenuProps) {
	const editor = useEditorRef();
	const openState = useOpenState();
	const aiEnhanceObject = useStore($aiEnhanceStore);

	return (
		<DropdownMenu modal={false} {...openState} {...props}>
			<DropdownMenuTrigger asChild>
				{trigger ?? (
					<ToolbarButton
						className={cn(
							props.triggerClassName,
							"text-orange-600 hover:bg-orange-600/10 hover:text-orange-600 flex items-center gap-4 focus-visible:ring-orange-500",
						)}
						pressed={openState.open}
						tooltip="AI Tools"
						isDropdown={props.isDropdown ?? true}
					>
						<SparklesIcon className="size-4 mr-4" />
						<Small className="font-bold">AI Tools</Small>
					</ToolbarButton>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64 relative font-semibold mx-6	">
				<DropdownMenuGroup>
					{AIEnhanceTools.map((tool, index) => (
						<Fragment key={useId()}>
							<DropdownMenuItem
								onClick={() => {
									setAIEnhance({
										body:
											getSelectionText(editor).trim() ?? aiEnhanceObject.body,
										path: tool.path,
										trigger: true,
										title: tool.title,
									});
									$articleAiPanelCollapseStore.set(false);
								}}
							>
								<tool.icon className="mr-4 h-4 w-4" />
								<span>{tool.label}</span>
							</DropdownMenuItem>

							{index === 3 && (
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<SpeechIcon className="mr-4 h-4 w-4" />
										<span>Adjust Tones</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent className="font-semibold">
											{AiToneTools.map((tone) => (
												<DropdownMenuItem
													key={useId()}
													onClick={() => {
														setAIEnhance({
															body: getSelectionText(editor),
															path: "/tone/" + tone.label,
															trigger: true,
															title: tone.label + " Toning",
														});
														$articleAiPanelCollapseStore.set(false);
													}}
												>
													<tone.icon className="mr-4 h-4 w-4" />
													<span className="capitalize">{tone.label}</span>
												</DropdownMenuItem>
											))}
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
							)}
						</Fragment>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

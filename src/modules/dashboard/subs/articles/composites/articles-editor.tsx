import { $editingArticle } from "@articles/stores/article-store";
import Logo from "@custom/logo/logo";
import { SheetClose } from "@ui/sheet";

import { EDITOR_PLUGINS } from "@editor/constants/editor-plugins";

import { useStore } from "@nanostores/react";
import { CommentsPopover } from "@plate-ui/comments-popover";
import { Editor } from "@plate-ui/editor";
import { FixedToolbar } from "@plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@plate-ui/floating-toolbar-buttons";
import { ToolbarButton } from "@plate-ui/toolbar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@plate-ui/tooltip";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate, PlateController } from "@udecode/plate-common";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@ui/resizable";

import { cn } from "@/common/lib/utils";
import { $articleAiPanelCollapseStore } from "@/modules/dashboard/subs/articles/stores/article-ai-store";
import { XIcon } from "lucide-react";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ArticlesEditorRightPanel = React.lazy(
	() => import("@articles/composites/articles-editor-right-panel"),
);
const ArticlesAssitantsSheet = React.lazy(
	() => import("@articles/composites/articles-assistance-sheet"),
);

export default function ArticlesEditor() {
	const initialValue = useStore($editingArticle);
	const isCollapsed = useStore($articleAiPanelCollapseStore);

	return (
		<TooltipProvider>
			<PlateController>
				<DndProvider backend={HTML5Backend} context={window}>
					<CommentsProvider users={{}} myUserId="1">
						<Plate
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							plugins={EDITOR_PLUGINS}
							initialValue={initialValue}
							normalizeInitialValue
						>
							<FixedToolbar className="fixed col-span-full top-0 left-0 mx-auto h-fit min-h-14 w-full place-self-center self-center overflow-y-hidden rounded-none bg-card p-1 px-2">
								<FixedToolbarButtons
									leftToolbars={<Logo className="mx-4" spa />}
									rightToolBars={
										<Tooltip delayDuration={0}>
											<TooltipTrigger asChild>
												<SheetClose asChild>
													<ToolbarButton size={"icon"} className="ml-8 mr-1.5">
														<XIcon className="h-4 w-4" />
														<span className="sr-only">Close</span>
													</ToolbarButton>
												</SheetClose>
											</TooltipTrigger>
											<TooltipContent className="font-bold" side="left">
												Close
											</TooltipContent>
										</Tooltip>
									}
								/>
							</FixedToolbar>

							<ResizablePanelGroup
								direction="horizontal"
								className="h-full bg-card"
							>
								<ResizablePanel
									className="relative flex h-full"
									collapsible={false}
									minSize={1}
								>
									<Editor
										containerClassName="*:font-serif w-full h-full min-h-full overflow-auto flex flex-col items-center max-h-full [&_.slate-SelectionArea]:h-full"
										className="h-full w-full mx-auto border-0 px-[17.5%] pt-24 *:text-lg bg-card dark:bg-background rounded-none transition-all"
										focusRing={false}
									/>

									<React.Suspense>
										<ArticlesEditorRightPanel />
									</React.Suspense>
								</ResizablePanel>

								<ResizableHandle />

								<ResizablePanel
									className={cn(
										"max-w-screen-sm bg-card transition-all",
										isCollapsed ? "max-w-0" : "min-w-fit",
									)}
									collapsible={true}
									minSize={24}
									defaultSize={0}
									onResize={(size) =>
										$articleAiPanelCollapseStore.set(size === 0)
									}
								>
									<ArticlesAssitantsSheet />
								</ResizablePanel>
							</ResizablePanelGroup>
							<FloatingToolbar>
								<FloatingToolbarButtons />
							</FloatingToolbar>

							<CommentsPopover />
						</Plate>
					</CommentsProvider>
				</DndProvider>
			</PlateController>
		</TooltipProvider>
	);
}

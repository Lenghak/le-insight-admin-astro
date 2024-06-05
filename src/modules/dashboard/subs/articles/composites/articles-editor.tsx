import { $articleAiPanelCollapseStore } from "@articles/stores/article-ai-store";
import { $editingArticle } from "@articles/stores/article-store";
import Logo from "@custom/logo/logo";
import { SheetClose } from "@ui/sheet";

import { EDITOR_PLUGINS } from "@editor/constants/editor-plugins";

import { useStore } from "@nanostores/react";
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
import { Plate, PlateController } from "@udecode/plate-common";

import { cn } from "@/common/lib/utils";
import { CommentsProvider } from "@udecode/plate-comments";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@ui/resizable";
import { XIcon } from "lucide-react";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";

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
							<FloatingToolbar className="shadow-sm px-1" role="dialog">
								<FloatingToolbarButtons />
							</FloatingToolbar>

							<FixedToolbar className="fixed z-[99999] col-span-full top-0 left-0 mx-auto h-fit min-h-14 w-full place-self-center self-center overflow-y-hidden rounded-none bg-card dark:bg-background p-1 px-2">
								<FixedToolbarButtons
									leftToolbars={
										<Link to={"/dashboard/users"}>
											<Logo className="mx-4" spa />
										</Link>
									}
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
								className="h-full bg-card relative"
							>
								<ResizablePanel
									className="relative flex h-full"
									collapsible={false}
									minSize={1}
								>
									<Editor
										containerClassName="*:font-serif -z-1 w-full h-full min-h-full overflow-auto flex flex-col items-center max-h-full [&_.slate-SelectionArea]:h-full"
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
										"max-w-screen-sm bg-background transition-all relative z-[9999]",
										isCollapsed ? "max-w-0" : "min-w-96",
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

							{/* <CommentsPopover /> */}
						</Plate>
					</CommentsProvider>
				</DndProvider>
			</PlateController>
		</TooltipProvider>
	);
}

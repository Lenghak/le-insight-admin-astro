import { cn } from "@/common/lib/utils";

import { $articleAiPanelCollapseStore } from "@articles/stores/article-ai-store";
import { $editingArticle } from "@articles/stores/article-store";

import { EDITOR_PLUGINS } from "@editor/constants/editor-plugins";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@ui/resizable";

import Logo from "@custom/logo/logo";

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

import { useStore } from "@nanostores/react";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate, PlateController } from "@udecode/plate-common";
import { XIcon } from "lucide-react";
import React, { Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link, useNavigate } from "react-router-dom";

const ArticlesEditorLeftPanel = React.lazy(
  () => import("@articles/composites/articles-editor-left-panel"),
);

const ArticlesEditorRightPanel = React.lazy(
  () => import("@articles/composites/articles-editor-right-panel"),
);
const ArticlesAssitantsSheet = React.lazy(
  () => import("@articles/composites/articles-assistance-sheet"),
);

export default function PlateEditor() {
  const initialValue = useStore($editingArticle);
  const isCollapsed = useStore($articleAiPanelCollapseStore);
  const navigate = useNavigate();
  return (
    <TooltipProvider>
      <PlateController>
        <DndProvider
          backend={HTML5Backend}
          context={window}
        >
          <CommentsProvider
            users={{}}
            myUserId="1"
          >
            <Plate
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              plugins={EDITOR_PLUGINS}
              initialValue={initialValue}
              normalizeInitialValue
            >
              <FloatingToolbar
                className="px-1 shadow-sm"
                role="dialog"
              >
                <FloatingToolbarButtons />
              </FloatingToolbar>

              <FixedToolbar className="fixed left-0 top-0 col-span-full mx-auto h-fit min-h-14 w-full place-self-center self-center overflow-y-hidden rounded-none bg-card p-1 px-2 dark:bg-background">
                <FixedToolbarButtons
                  leftToolbars={
                    <Link to={"/spa/dashboard/users"}>
                      <Logo
                        className="mx-4"
                        spa
                      />
                    </Link>
                  }
                  rightToolBars={
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <ToolbarButton
                          size={"icon"}
                          className="ml-8 mr-1.5"
                          onClick={() =>
                            navigate("/spa/dashboard/articles", {
                              replace: true,
                            })
                          }
                        >
                          <XIcon className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </ToolbarButton>
                      </TooltipTrigger>
                      <TooltipContent
                        className="font-bold"
                        side="left"
                      >
                        Close
                      </TooltipContent>
                    </Tooltip>
                  }
                />
              </FixedToolbar>

              <ResizablePanelGroup
                direction="horizontal"
                className="relative h-full bg-card"
              >
                <ResizablePanel
                  className="relative flex h-full"
                  collapsible={false}
                  minSize={1}
                >
                  <Suspense>
                    <ArticlesEditorLeftPanel />
                  </Suspense>

                  <Editor
                    containerClassName="*:font-serif w-full h-full min-h-full overflow-auto flex flex-col items-center max-h-full [&_.slate-SelectionArea]:h-full"
                    className="mx-auto h-full w-full rounded-none border-0 bg-card px-[17.5%] pt-24 transition-all *:text-lg dark:bg-background"
                    focusRing={false}
                  />

                  <Suspense>
                    <ArticlesEditorRightPanel />
                  </Suspense>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel
                  className={cn(
                    "relative max-w-screen-sm bg-background transition-all",
                    isCollapsed ? "max-w-0" : "min-w-[40rem]",
                  )}
                  collapsible={true}
                  minSize={24}
                  defaultSize={0}
                  onResize={(size) =>
                    $articleAiPanelCollapseStore.set(size === 0)
                  }
                >
                  <Suspense>
                    <ArticlesAssitantsSheet />
                  </Suspense>
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

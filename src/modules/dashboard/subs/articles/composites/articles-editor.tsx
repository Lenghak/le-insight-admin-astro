import ArticlesThumbnailForm from "@articles/composites/articles-thumbnail-form";
import { $editingArticle } from "@articles/stores/article-store";

import { EDITOR_PLUGINS } from "@editor/constants/editor-plugins";

import { Button } from "@ui/button";

import { CommentsPopover } from "@plate-ui/comments-popover";
import { Editor } from "@plate-ui/editor";
import { FixedToolbar } from "@plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@plate-ui/floating-toolbar-buttons";
import { TooltipProvider } from "@plate-ui/tooltip";

import { SpaModeToggle } from "@custom/theme/spa-mode-toggle";

import { useStore } from "@nanostores/react";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate, PlateController } from "@udecode/plate-common";
import { CheckIcon } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function ArticlesEditor() {
  const initialValue = useStore($editingArticle);

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
              onChange={(value) => $editingArticle.set(value)}
            >
              <FixedToolbar className="fixed left-auto top-4 mx-auto h-fit min-h-14 w-[calc(100%_-_6rem)] place-self-center self-center overflow-y-hidden rounded-full border bg-card p-1 px-2 shadow-sm">
                <FixedToolbarButtons />
              </FixedToolbar>

              <Editor
                containerClassName="*:font-serif z-0 w-full h-full min-h-full overflow-auto flex flex-col max-h-full [&_.slate-SelectionArea]:h-full"
                className="h-full w-full border-0 px-32 pt-24"
                focusRing={false}
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>
              <CommentsPopover />

              <div className="group fixed bottom-6 right-0 flex flex-col items-end gap-6 pr-2">
                <SpaModeToggle
                  variant={"outline"}
                  className="relative gap-4 font-bold"
                />

                <ArticlesThumbnailForm
                  trigger={
                    <Button className="group/button relative min-h-9 w-full min-w-9 items-center justify-center gap-0 p-0 font-bold transition-all hover:w-auto hover:gap-4 hover:px-6">
                      <CheckIcon
                        className="size-4"
                        strokeWidth={3}
                      />
                      <span className="invisible w-0 transition-all group-hover/button:visible group-hover/button:w-auto">
                        Submit
                      </span>
                    </Button>
                  }
                />
              </div>
            </Plate>
          </CommentsProvider>
        </DndProvider>
      </PlateController>
    </TooltipProvider>
  );
}

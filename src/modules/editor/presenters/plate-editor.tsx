
import { EDITOR_PLUGINS } from "@editor/constants/editor-plugins";

import { TooltipProvider } from "@ui/tooltip";

import { CommentsPopover } from "@plate-ui/comments-popover";
import { Editor } from "@plate-ui/editor";
import { FixedToolbar } from "@plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@plate-ui/floating-toolbar-buttons";

import { CommentsProvider } from "@udecode/plate-comments";
import { Plate, PlateController } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialValue = [
  { id: 1, type: "h1", children: [{ text: "" }] },
  {
    type: "p",
    children: [{ text: "" }],
  },
];

export default function PlateEditor() {
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
              plugins={EDITOR_PLUGINS}
              initialValue={initialValue}
              normalizeInitialValue
            >
              <FixedToolbar className="sticky top-6 h-fit min-h-12 w-[calc(100%_-_3rem)] self-center overflow-hidden rounded-xl border-b-0 bg-card p-1.5 shadow-sm">
                <FixedToolbarButtons />
              </FixedToolbar>

              <section className="mt-4 flex h-full w-full flex-col items-center overflow-hidden px-6">
                <Editor
                  containerClassName="*:font-serif w-full h-full min-h-full overflow-auto flex flex-col max-h-full [&_.slate-SelectionArea]:h-full [&_.slate-SelectionArea]:overflow-hidden"
                  className="h-full w-full border-0 bg-card px-32 py-12"
                  focusRing={false}
                />
              </section>

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

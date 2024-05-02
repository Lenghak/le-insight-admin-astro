import { EDITOR_PLUGINS } from "@/modules/editor/constants/editor-plugins";

import { CommentsPopover } from "@plate-ui/comments-popover";
import { Editor } from "@plate-ui/editor";
import { FloatingToolbar } from "@plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@plate-ui/floating-toolbar-buttons";
import { MentionCombobox } from "@plate-ui/mention-combobox";

import { FixedToolbar } from "@/common/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/common/components/plate-ui/fixed-toolbar-buttons";
import { TooltipProvider } from "@/common/components/ui/tooltip";

import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Hello, World!" }],
  },
];

export default function PlateEditor() {
  return (
    <TooltipProvider>
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider
          users={{}}
          myUserId="1"
        >
          <Plate
            plugins={EDITOR_PLUGINS}
            initialValue={initialValue}
          >
            <FixedToolbar className="sticky top-0 mt-4 h-fit min-h-12 w-[calc(100%_-_3rem)] self-center rounded-xl border-b-0 bg-card p-1.5 shadow-sm">
              <FixedToolbarButtons />
            </FixedToolbar>

            <section className="flex h-full w-full flex-col px-6">
              <Editor
                containerClassName="w-full h-full min-h-full overflow-auto flex flex-col max-h-full"
                className="w-full border-0 bg-card px-24 py-12"
                focusRing={false}
              />
            </section>

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <MentionCombobox items={[]} />
            <CommentsPopover />
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </TooltipProvider>
  );
}

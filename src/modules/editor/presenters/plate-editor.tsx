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
            <FixedToolbar className="static">
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className="h-full border-0 p-6"
              focusRing={false}
            />

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

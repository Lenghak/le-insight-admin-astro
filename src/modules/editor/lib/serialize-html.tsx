import { TooltipProvider } from "@/common/components/plate-ui/tooltip";

import { type PlateEditor } from "@udecode/plate-common";
import { serializeHtml as serialize } from "@udecode/plate-serializer-html";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const serializeHtml = (editor: PlateEditor) => {
  return serialize(editor, {
    nodes: editor.children,
    dndWrapper: (props) => (
      <TooltipProvider>
        <DndProvider
          backend={HTML5Backend}
          context={window}
          {...props}
        />
      </TooltipProvider>
    ),
    convertNewLinesToHtmlBr: true,
  });
};


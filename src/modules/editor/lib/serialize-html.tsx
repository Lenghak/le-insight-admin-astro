import { SERIALIZE_COMPONENTS } from "@/modules/editor/constants/editor-components";
import { SERIALIZE_PLUGINS } from "@/modules/editor/constants/editor-plugins";

import { TooltipProvider } from "@/common/components/plate-ui/tooltip";

import { createPlateEditor } from "@udecode/plate";
import type { PlateCloudEditor } from "@udecode/plate-cloud";
import { serializeHtml as serialize } from "@udecode/plate-serializer-html";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const serializeHtml = (editor: PlateCloudEditor) => {
  const editorTemp = createPlateEditor({
    components: SERIALIZE_COMPONENTS,
    normalizeInitialValue: true,
    disableCorePlugins: true,
    editor: { ...editor },
    plugins: SERIALIZE_PLUGINS,
  });

  return serialize(editorTemp, {
    nodes: editorTemp?.children ?? [],
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

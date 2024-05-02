import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";
import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";

import { MarkToolbarButton } from "./mark-toolbar-button";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton
            nodeType={MARK_BOLD}
            tooltip="Bold (⌘+B)"
          >
            <BoldIcon className="size-4" />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_ITALIC}
            tooltip="Italic (⌘+I)"
          >
            <ItalicIcon className="size-4" />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_UNDERLINE}
            tooltip="Underline (⌘+U)"
          >
            <UnderlineIcon className="size-4" />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_STRIKETHROUGH}
            tooltip="Strikethrough (⌘+⇧+M)"
          >
            <StrikethroughIcon className="size-4" />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_CODE}
            tooltip="Code (⌘+E)"
          >
            <Code2Icon className="size-4" />
          </MarkToolbarButton>
        </>
      )}

      <MoreDropdownMenu />
    </>
  );
}

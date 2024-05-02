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

import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ModeDropdownMenu } from "./mode-dropdown-menu";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: "translateX(calc(-1px))",
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton
                tooltip="Bold (⌘+B)"
                nodeType={MARK_BOLD}
              >
                <BoldIcon className="size-4" />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Italic (⌘+I)"
                nodeType={MARK_ITALIC}
              >
                <ItalicIcon className="size-4" />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <UnderlineIcon className="size-4" />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <StrikethroughIcon className="size-4" />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Code (⌘+E)"
                nodeType={MARK_CODE}
              >
                <Code2Icon className="size-4" />
              </MarkToolbarButton>
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}

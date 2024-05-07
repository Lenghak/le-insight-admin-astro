import { IndentToolbarButton } from "@plate-ui/indent-toolbar-button";
import { OutdentToolbarButton } from "@plate-ui/outdent-toolbar-button";

import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";
import {
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";

import { AlignDropdownMenu } from "./align-dropdown-menu";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import { LineHeightDropdownMenu } from "./line-height-dropdown-menu";
import { LinkToolbarButton } from "./link-toolbar-button";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { Separator } from "./separator";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <Separator className="h-6 w-[0.5px]" />

          <AlignDropdownMenu />
          <LineHeightDropdownMenu />
          <IndentToolbarButton />
          <OutdentToolbarButton />

          <Separator className="h-6 w-[0.5px]" />

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

          <LinkToolbarButton />

          <ColorDropdownMenu
            nodeType={MARK_COLOR}
            tooltip="Text Color"
          >
            <BaselineIcon className="size-4" />
          </ColorDropdownMenu>

          <ColorDropdownMenu
            nodeType={MARK_BG_COLOR}
            tooltip="Highlight Color"
          >
            <PaintBucketIcon className="size-4" />
          </ColorDropdownMenu>

          <Separator className="h-6 w-[0.5px]" />
        </>
      )}

      <MoreDropdownMenu />
    </>
  );
}
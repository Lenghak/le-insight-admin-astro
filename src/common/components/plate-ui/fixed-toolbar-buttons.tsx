import { AlignDropdownMenu } from "@plate-ui/align-dropdown-menu";
import { ColorDropdownMenu } from "@plate-ui/color-dropdown-menu";
import { CommentToolbarButton } from "@plate-ui/comment-toolbar-button";
import { EmojiDropdownMenu } from "@plate-ui/emoji-dropdown-menu";
import { IndentListToolbarButton } from "@plate-ui/indent-list-toolbar-button";
import { IndentToolbarButton } from "@plate-ui/indent-toolbar-button";
import { InsertDropdownMenu } from "@plate-ui/insert-dropdown-menu";
import { LineHeightDropdownMenu } from "@plate-ui/line-height-dropdown-menu";
import { LinkToolbarButton } from "@plate-ui/link-toolbar-button";
import { MediaDropdownMenu } from "@plate-ui/media-dropdown-menu";
import { ModeDropdownMenu } from "@plate-ui/mode-dropdown-menu";
import { MoreDropdownMenu } from "@plate-ui/more-dropdown-menu";
import { OutdentToolbarButton } from "@plate-ui/outdent-toolbar-button";
import { TableDropdownMenu } from "@plate-ui/table-dropdown-menu";
import { ToggleToolbarButton } from "@plate-ui/toggle-toolbar-button";
import { TurnIntoDropdownMenu } from "@plate-ui/turn-into-dropdown-menu";

import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
import { ListStyleType } from "@udecode/plate-indent-list";
import {
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";

import { MarkToolbarButton } from "./mark-toolbar-button";
import { ToolbarGroup } from "./toolbar";

export function FixedToolbarButtons({ }: { id?: string }) {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-y-hidden">
      <div
        className="flex"
        style={{
          // Conceal the first separator on each line using overflow
          transform: "translateX(calc(-1px))",
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              {!readOnly && <TurnIntoDropdownMenu />}
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

              {!readOnly && (
                <>
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
                </>
              )}

              {!readOnly && (
                <>
                  <ColorDropdownMenu
                    nodeType={MARK_COLOR}
                    tooltip="Text Color"
                  >
                    <BaselineIcon className={"size-4"} />
                  </ColorDropdownMenu>
                  <ColorDropdownMenu
                    nodeType={MARK_BG_COLOR}
                    tooltip="Highlight Color"
                  >
                    <PaintBucketIcon className={"size-4"} />
                  </ColorDropdownMenu>
                </>
              )}
            </ToolbarGroup>

            <ToolbarGroup>
              {!readOnly && <AlignDropdownMenu />}

              {!readOnly && <LineHeightDropdownMenu />}

              {!readOnly && (
                <>
                  <IndentListToolbarButton nodeType={ListStyleType.Disc} />
                  <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
                  {/* <IndentTodoToolbarButton /> */}
                </>
              )}

              {!readOnly && (
                <>
                  <OutdentToolbarButton />
                  <IndentToolbarButton />
                </>
              )}
            </ToolbarGroup>

            <ToolbarGroup>
              {!readOnly && <ToggleToolbarButton />}

              {!readOnly && <LinkToolbarButton />}

              {!readOnly && <MediaDropdownMenu />}

              {!readOnly && <TableDropdownMenu />}

              {!readOnly && <EmojiDropdownMenu />}

              <MoreDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <CommentToolbarButton />
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}

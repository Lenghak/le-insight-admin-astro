import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from "@plate-ui/dropdown-menu";
import { ToolbarButton } from "@plate-ui/toolbar";

import { type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { MARK_SUBSCRIPT, MARK_SUPERSCRIPT } from "@udecode/plate-basic-marks";
import {
  collapseSelection,
  focusEditor,
  toggleMark,
  useEditorRef,
} from "@udecode/plate-common";
import { MARK_HIGHLIGHT } from "@udecode/plate-highlight";
import { MARK_KBD } from "@udecode/plate-kbd";
import {
  HighlighterIcon,
  KeyboardIcon,
  MoreHorizontalIcon,
  SubscriptIcon,
  SuperscriptIcon,
} from "lucide-react";

export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu
      modal={false}
      {...openState}
      {...props}
    >
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="More"
          size={"icon"}
        >
          <MoreHorizontalIcon className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto"
      >
        <DropdownMenuItem
          className="font-semibold"
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_HIGHLIGHT,
            });
            collapseSelection(editor, { edge: "end" });
            focusEditor(editor);
          }}
        >
          <HighlighterIcon className="mr-4 size-4" />
          Highlight
        </DropdownMenuItem>

        <DropdownMenuItem
          className="font-semibold"
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_KBD,
            });
            collapseSelection(editor, { edge: "end" });
            focusEditor(editor);
          }}
        >
          <KeyboardIcon className="mr-4 size-4" />
          Keyboard input
        </DropdownMenuItem>

        <DropdownMenuItem
          className="font-semibold"
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUPERSCRIPT,
              clear: MARK_SUBSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <SuperscriptIcon className="mr-4 size-5" />
          Superscript
          {/* (⌘+,) */}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-semibold"
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUBSCRIPT,
              clear: MARK_SUPERSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <SubscriptIcon className="mr-4 size-5" />
          Subscript
          {/* (⌘+.) */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

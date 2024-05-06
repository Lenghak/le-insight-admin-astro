import EmbedMediaDialog from "@/modules/editor/composites/embed-media-dialog";
import UploadMediaDialog from "@/modules/editor/composites/upload-media-dialog";
import {
  EDITOR_IMAGE_DIALOG_ID,
  EDITOR_MEDIA_DIALOG_ID,
} from "@/modules/editor/constants/dailogs-keys";
import { setMediaDialogState } from "@/modules/editor/stores/upload-dialog-store";

import { cn } from "@/common/lib/utils";

import { type DropdownMenuProps as PrimitiveDropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
} from "@udecode/plate-code-block";
import {
  focusEditor,
  insertEmptyElement,
  useEditorRef,
} from "@udecode/plate-common";
import { ELEMENT_EXCALIDRAW } from "@udecode/plate-excalidraw";
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from "@udecode/plate-heading";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { toggleIndentList } from "@udecode/plate-indent-list";
import { ELEMENT_LINK, triggerFloatingLink } from "@udecode/plate-link";
import { ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED } from "@udecode/plate-media";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { ELEMENT_TABLE, insertTable } from "@udecode/plate-table";
import {
  BrushIcon,
  Code2Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PaperclipIcon,
  PlusIcon,
  QuoteIcon,
  Table2Icon,
  TypeIcon,
} from "lucide-react";
import React, { Fragment } from "react";

import type { PlateCloudEditor } from "@udecode/plate-cloud";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

interface DropdownMenuProps extends PrimitiveDropdownMenuProps {
  triggerClassName?: string;
  isDropdown?: boolean;
}

const items = [
  {
    label: "Basic blocks",
    items: [
      {
        value: ELEMENT_PARAGRAPH,
        label: "Paragraph",
        description: "Paragraph",
        icon: TypeIcon,
      },
      {
        value: ELEMENT_H1,
        label: "Heading 1",
        description: "Heading 1",
        icon: Heading1Icon,
      },
      {
        value: ELEMENT_H2,
        label: "Heading 2",
        description: "Heading 2",
        icon: Heading2Icon,
      },
      {
        value: ELEMENT_H3,
        label: "Heading 3",
        description: "Heading 3",
        icon: Heading3Icon,
      },
      {
        value: ELEMENT_BLOCKQUOTE,
        label: "Quote",
        description: "Quote (⌘+⇧+.)",
        icon: QuoteIcon,
      },
      {
        value: ELEMENT_TABLE,
        label: "Table",
        description: "Table",
        icon: Table2Icon,
      },
      {
        value: "ul",
        label: "Bulleted list",
        description: "Bulleted list",
        icon: ListIcon,
      },
      {
        value: "ol",
        label: "Numbered list",
        description: "Numbered list",
        icon: ListOrderedIcon,
      },
      {
        value: ELEMENT_HR,
        label: "Divider",
        description: "Divider (---)",
        icon: MinusIcon,
      },
    ],
  },
  {
    label: "Media",
    items: [
      {
        value: ELEMENT_CODE_BLOCK,
        label: "Code",
        description: "Code (```)",
        icon: Code2Icon,
      },
      {
        value: ELEMENT_IMAGE,
        label: "Image",
        description: "Image",
        icon: ImageIcon,
      },
      {
        value: ELEMENT_MEDIA_EMBED,
        label: "Embed",
        description: "Embed",
        icon: PaperclipIcon,
      },
      {
        value: ELEMENT_EXCALIDRAW,
        label: "Excalidraw",
        description: "Excalidraw",
        icon: BrushIcon,
      },
    ],
  },
  {
    label: "Inline",
    items: [
      {
        value: ELEMENT_LINK,
        label: "Link",
        description: "Link",
        icon: LinkIcon,
      },
    ],
  },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <Fragment>
      <DropdownMenu
        modal={false}
        {...openState}
        {...props}
      >
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            className={cn("gap-2", props.triggerClassName)}
            pressed={openState.open}
            tooltip="Insert"
            isDropdown={props.isDropdown ?? true}
          >
            <PlusIcon className="size-4" />
          </ToolbarButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="flex max-h-[500px] min-w-0 flex-col gap-0.5 overflow-y-auto"
        >
          {items.map(({ items: nestedItems, label }, index) => (
            <React.Fragment key={label}>
              {index !== 0 && <DropdownMenuSeparator />}

              <DropdownMenuLabel>{label}</DropdownMenuLabel>
              {nestedItems.map(
                ({ value: type, label: itemLabel, icon: Icon }) => (
                  <DropdownMenuItem
                    key={type}
                    className="min-w-[180px] font-semibold"
                    onSelect={() => {
                      switch (type) {
                        case ELEMENT_CODE_BLOCK: {
                          insertEmptyCodeBlock(editor);
                          break;
                        }
                        case ELEMENT_IMAGE: {
                          setMediaDialogState({
                            id: EDITOR_IMAGE_DIALOG_ID,
                            isOpen: true,
                          });
                          break;
                        }
                        case ELEMENT_MEDIA_EMBED: {
                          setMediaDialogState({
                            id: EDITOR_MEDIA_DIALOG_ID,
                            isOpen: true,
                          });
                          break;
                        }
                        case "ul":
                        case "ol": {
                          insertEmptyElement(editor, ELEMENT_PARAGRAPH, {
                            select: true,
                            nextBlock: true,
                          });

                          toggleIndentList(editor, {
                            listStyleType: type === "ul" ? "disc" : "decimal",
                          });

                          break;
                        }
                        case ELEMENT_TABLE: {
                          insertTable(editor);
                          break;
                        }
                        case ELEMENT_LINK: {
                          triggerFloatingLink(editor, { focused: true });
                          break;
                        }
                        default: {
                          insertEmptyElement(editor, type, {
                            select: true,
                            nextBlock: true,
                          });
                        }
                      }

                      focusEditor(editor);
                    }}
                  >
                    <Icon className="mr-4 size-4" />
                    {itemLabel}
                  </DropdownMenuItem>
                ),
              )}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <UploadMediaDialog editor={editor as PlateCloudEditor} />
      <EmbedMediaDialog editor={editor} />
    </Fragment>
  );
}

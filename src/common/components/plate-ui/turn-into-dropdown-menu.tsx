import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
  collapseSelection,
  findNode,
  focusEditor,
  isBlock,
  type TElement,
  toggleNodeType,
  useEditorRef,
  useEditorSelector,
} from "@udecode/plate-common";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import { toggleIndentList } from "@udecode/plate-indent-list";
import { unwrapList } from "@udecode/plate-list";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  TypeIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

const items = [
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
    value: ELEMENT_H4,
    label: "Heading 4",
    description: "Heading 4",
    icon: Heading4Icon,
  },
  {
    value: ELEMENT_H5,
    label: "Heading 5",
    description: "Heading 5",
    icon: Heading5Icon,
  },
  {
    value: ELEMENT_H6,
    label: "Heading 6",
    description: "Heading 6",
    icon: Heading6Icon,
  },
  {
    value: ELEMENT_BLOCKQUOTE,
    label: "Quote",
    description: "Quote (⌘+⇧+.)",
    icon: QuoteIcon,
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
];

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const defaultItem = items.find((item) => item.value === ELEMENT_PARAGRAPH)!;

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    const entry = findNode<TElement>(editor, {
      match: (n) => isBlock(editor, n),
    });

    if (entry) {
      return (
        items.find((item) => item.value === entry[0].type)?.value ??
        ELEMENT_PARAGRAPH
      );
    }

    return ELEMENT_PARAGRAPH;
  }, []);

  const editor = useEditorRef();
  const openState = useOpenState();

  const selectedItem =
    items.find((item) => item.value === value) ?? defaultItem;
  const { icon: SelectedItemIcon, label: selectedItemLabel } = selectedItem;

  return (
    <DropdownMenu
      modal={false}
      {...openState}
      {...props}
    >
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Turn into"
          isDropdown
        >
          <SelectedItemIcon className="size-4" />
          <span className="sr-only">{selectedItemLabel}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="min-w-0"
      >
        <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wide">
          HIERARCHY
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={(type) => {
            if (type === "ul" || type === "ol") {
              toggleIndentList(editor, {
                listStyleType: type === "ul" ? "disc" : "decimal",
              });
            } else {
              unwrapList(editor);
              toggleNodeType(editor, { activeType: type });
            }

            collapseSelection(editor);
            focusEditor(editor);
          }}
        >
          {items.map(({ value: itemValue, label, icon: Icon }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              value={itemValue}
              className="min-w-[180px] font-semibold"
            >
              <Icon className="mr-4 size-4" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

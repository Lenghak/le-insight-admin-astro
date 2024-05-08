import { type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
  focusEditor,
  someNode,
  useEditorRef,
  useEditorSelector,
} from "@udecode/plate-common";
import {
  ELEMENT_TABLE,
  deleteColumn,
  deleteRow,
  deleteTable,
  insertTable,
  insertTableColumn,
  insertTableRow,
} from "@udecode/plate-table";
import {
  BetweenHorizonalStartIcon,
  BetweenVerticalStartIcon,
  Columns,
  MinusIcon,
  Table2Icon,
  TableIcon,
  TrashIcon,
} from "lucide-react";
import { TbPlus } from "react-icons/tb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function TableDropdownMenu(props: DropdownMenuProps) {
  const tableSelected = useEditorSelector(
    (editor) => someNode(editor, { match: { type: ELEMENT_TABLE } }),
    [],
  );

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
          tooltip="Table"
          isDropdown
        >
          <Table2Icon className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex w-[180px] min-w-0 flex-col gap-0.5"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="font-semibold">
            <TableIcon className="mr-4 size-4" />
            <span>Table</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="min-w-[180px] font-semibold"
              onSelect={() => {
                insertTable(editor);
                focusEditor(editor);
              }}
            >
              <TbPlus className="mr-4 size-4" />
              Insert table
            </DropdownMenuItem>
            <DropdownMenuItem
              className="min-w-[180px] font-semibold"
              disabled={!tableSelected}
              onSelect={() => {
                deleteTable(editor);
                focusEditor(editor);
              }}
            >
              <TrashIcon className="mr-4 size-4" />
              Delete table
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className="font-semibold"
            disabled={!tableSelected}
          >
            <Columns className="mr-4 size-4" />
            <span>Column</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="min-w-[180px] font-semibold"
              disabled={!tableSelected}
              onSelect={() => {
                insertTableColumn(editor);
                focusEditor(editor);
              }}
            >
              <BetweenVerticalStartIcon className="mr-4 size-4" />
              Insert column after
            </DropdownMenuItem>
            <DropdownMenuItem
              className="min-w-[180px] font-semibold"
              disabled={!tableSelected}
              onSelect={() => {
                deleteColumn(editor);
                focusEditor(editor);
              }}
            >
              <MinusIcon className="mr-4 size-4" />
              Delete column
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className="font-semibold"
            disabled={!tableSelected}
          >
            <Columns className="mr-4 size-4 rotate-90" />
            <span>Row</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="min-w-[180px] font-semibold"
              disabled={!tableSelected}
              onSelect={() => {
                insertTableRow(editor);
                focusEditor(editor);
              }}
            >
              <BetweenHorizonalStartIcon className="mr-4 size-4" />
              Insert row after
            </DropdownMenuItem>
            <DropdownMenuItem
              className="min-w-[180px] font-semibold"
              disabled={!tableSelected}
              onSelect={() => {
                deleteRow(editor);
                focusEditor(editor);
              }}
            >
              <MinusIcon className="mr-4 size-4" />
              Delete row
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

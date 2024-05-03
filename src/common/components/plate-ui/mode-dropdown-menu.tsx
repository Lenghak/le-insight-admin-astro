import { type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
  focusEditor,
  useEditorReadOnly,
  useEditorRef,
  usePlateStore,
} from "@udecode/plate-common";
import { EyeIcon, PenLineIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function ModeDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const setReadOnly = usePlateStore().set.readOnly();
  const readOnly = useEditorReadOnly();
  const openState = useOpenState();

  let value = "editing";
  if (readOnly) value = "viewing";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item: any = {
    editing: (
      <div className="flex items-center">
        <PenLineIcon className="mr-4 size-4" />
        <span className="hidden font-semibold lg:inline">Editing</span>
      </div>
    ),
    viewing: (
      <div className="flex items-center">
        <EyeIcon className="mr-4 size-4" />
        <span className="hidden font-semibold lg:inline">Viewing</span>
      </div>
    ),
  };

  return (
    <DropdownMenu
      modal={false}
      {...openState}
      {...props}
    >
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Editing mode"
          isDropdown
          className="min-w-[auto] lg:min-w-[130px]"
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            item[value]
          }
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="mr-8 min-w-[180px]"
      >
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={(newValue) => {
            if (newValue !== "viewing") {
              setReadOnly(false);
            }

            if (newValue === "viewing") {
              setReadOnly(true);
              return;
            }

            if (newValue === "editing") {
              focusEditor(editor);
              return;
            }
          }}
        >
          <DropdownMenuRadioItem value="editing">
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              item.editing
            }
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="viewing">
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              item.viewing
            }
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

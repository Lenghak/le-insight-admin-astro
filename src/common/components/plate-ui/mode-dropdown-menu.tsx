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
      <>
        <PenLineIcon className="mr-2 size-5" />
        <span className="hidden lg:inline">Editing</span>
      </>
    ),
    viewing: (
      <>
        <EyeIcon className="mr-2 size-5" />
        <span className="hidden lg:inline">Viewing</span>
      </>
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
        className="min-w-[180px]"
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

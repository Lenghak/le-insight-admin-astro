import { type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { ImageIcon, PaperclipIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function MediaDropdownMenu(props: DropdownMenuProps) {
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
          tooltip="Media"
          isDropdown
        >
          <ImageIcon className="mr-2 size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex w-[180px] min-w-0 flex-col gap-0.5"
      >
        <DropdownMenuItem className="flex items-center gap-4 font-semibold">
          <ImageIcon className="size-4" />
          <span>Image</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-4 font-semibold">
          <PaperclipIcon className="size-4" />
          <span className="text-sm">Embeded</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
  useLineHeightDropdownMenu,
  useLineHeightDropdownMenuState,
} from "@udecode/plate-line-height";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function LineHeightDropdownMenu({ ...props }: DropdownMenuProps) {
  const openState = useOpenState();
  const state = useLineHeightDropdownMenuState();
  const { radioGroupProps } = useLineHeightDropdownMenu(state);

  return (
    <DropdownMenu
      modal={false}
      {...openState}
      {...props}
    >
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Line height"
          isDropdown
        >
          <Icon
            icon={"mingcute-line-height-line"}
            className="size-4"
          />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="min-w-0"
      >
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          {...radioGroupProps}
        >
          {state.values.map((_value: string) => (
            <DropdownMenuRadioItem
              key={_value}
              value={_value}
              className="min-w-[180px] font-medium"
            >
              {_value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

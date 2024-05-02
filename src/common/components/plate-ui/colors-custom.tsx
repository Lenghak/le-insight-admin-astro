import { buttonVariants } from "@ui/button";

import { cn } from "@/common/lib/utils";

import type { TColor } from "@/common/constants/color-constants";
import { useColorsCustom, useColorsCustomState } from "@udecode/plate-font";
import { ChevronRightIcon } from "lucide-react";
import { Fragment } from "react";

import { ColorDropdownMenuItems } from "./color-dropdown-menu-items";
import { ColorInput } from "./color-input";
import { DropdownMenuItem } from "./dropdown-menu";

type ColorsCustomProps = {
  color?: string;
  colors: TColor[];
  customColors: TColor[];
  updateCustomColor: (color: string) => void;
  updateColor: (color: string) => void;
};

export function ColorsCustom({
  color,
  colors,
  customColors,
  updateColor,
  updateCustomColor,
}: ColorsCustomProps) {
  const state = useColorsCustomState({
    color,
    colors,
    customColors,
    updateCustomColor,
  });
  const { inputProps, menuItemProps } = useColorsCustom(state);

  return (
    <Fragment>
      <ColorDropdownMenuItems
        color={color}
        colors={state.computedColors}
        updateColor={updateColor}
        className="col-span-full"
      />

      <ColorInput {...inputProps}>
        <DropdownMenuItem
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
            }),
            "w-full justify-between rounded-md font-semibold",
          )}
          {...menuItemProps}
        >
          <span>{color ?? "#00000000"}</span>
          <ChevronRightIcon className="size-4" />
        </DropdownMenuItem>
      </ColorInput>
    </Fragment>
  );
}

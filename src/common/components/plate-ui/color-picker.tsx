import { buttonVariants } from "@ui/button";

import { ColorsCustom } from "@/common/components/plate-ui/colors-custom";

import type { TColor } from "@/common/constants/color-constants";
import { cn, withRef } from "@udecode/cn";
import { TrashIcon } from "lucide-react";
import React from "react";

import { ColorDropdownMenuItems } from "./color-dropdown-menu-items";
import { DropdownMenuItem } from "./dropdown-menu";
import { Separator } from "./separator";

export const ColorPickerContent = withRef<
	"div",
	{
		color?: string;
		colors: TColor[];
		customColors: TColor[];
		updateColor: (color: string) => void;
		updateCustomColor: (color: string) => void;
		clearColor: () => void;
	}
>(
	(
		{
			color,
			colors,
			customColors,
			updateColor,
			updateCustomColor,
			clearColor,
			className,
			...props
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={cn("flex flex-col gap-4 p-4", className)}
				{...props}
			>
				<ColorDropdownMenuItems
					color={color}
					colors={colors}
					updateColor={updateColor}
					className="w-full"
				/>
				<Separator />

				<div className="grid w-full grid-cols-[1fr,_auto] grid-rows-2 items-center gap-2">
					<ColorsCustom
						color={color}
						colors={colors}
						customColors={customColors}
						updateColor={updateColor}
						updateCustomColor={updateCustomColor}
					/>

					<DropdownMenuItem
						className={cn(
							buttonVariants({
								size: "icon",
								variant: "outline",
							}),
							"size-9 items-center rounded-md",
						)}
						onClick={clearColor}
					>
						<span className="sr-only">Clear Color</span>
						<TrashIcon className="size-4" />
					</DropdownMenuItem>
				</div>
			</div>
		);
	},
);

export const ColorPicker = React.memo(
	ColorPickerContent,
	(prev, next) =>
		prev.color === next.color &&
		prev.colors === next.colors &&
		prev.customColors === next.customColors,
);

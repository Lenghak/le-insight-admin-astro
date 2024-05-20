import type { TColor } from "@/common/constants/color-constants";
import type { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import { cn } from "@udecode/cn";
import { CheckIcon } from "lucide-react";
import type React from "react";

import { buttonVariants } from "./button";
import { DropdownMenuItem } from "./dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type ColorDropdownMenuItemProps = {
	value: string;
	isBrightColor: boolean;
	isSelected: boolean;
	updateColor: (color: string) => void;
	name?: string;
} & DropdownMenuItemProps;

export function ColorDropdownMenuItem({
	name,
	value,
	isBrightColor,
	isSelected,
	updateColor,
	className,
	...props
}: ColorDropdownMenuItemProps) {
	const content = (
		<DropdownMenuItem
			className={cn(
				buttonVariants({
					variant: "outline",
					size: "icon",
					isMenu: true,
				}),
				"border border-solid border-muted p-0",
				!isBrightColor && "border-transparent text-white",
				className,
			)}
			style={{ backgroundColor: value }}
			onSelect={(e) => {
				e.preventDefault();
				updateColor(value);
			}}
			{...props}
		>
			<CheckIcon
				className={cn(
					"invisible size-6 transition-all",
					isSelected ? "visible" : "",
				)}
			/>
		</DropdownMenuItem>
	);

	return name ? (
		<Tooltip>
			<TooltipTrigger>{content}</TooltipTrigger>
			<TooltipContent>{name}</TooltipContent>
		</Tooltip>
	) : (
		content
	);
}

type ColorDropdownMenuItemsProps = {
	color?: string;
	colors: TColor[];
	updateColor: (color: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function ColorDropdownMenuItems({
	color,
	colors,
	updateColor,
	className,
	...props
}: ColorDropdownMenuItemsProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-[repeat(10,1fr)] gap-0.5 font-semibold",
				className,
			)}
			{...props}
		>
			{colors.map(({ name, value, isBrightColor }) => (
				<ColorDropdownMenuItem
					key={name ?? value}
					name={name}
					value={value}
					isBrightColor={isBrightColor}
					isSelected={color === value}
					updateColor={updateColor}
				/>
			))}
		</div>
	);
}

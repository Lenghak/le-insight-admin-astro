import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";

import { cn } from "@/common/lib/utils";

import * as React from "react";

// type Checked = DropdownMenuCheckboxItemProps["checked"];

type UsersSexFilterProps = {
  label: React.ReactNode;
  trigger: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function UsersSexFilter({
  label,
  trigger,
  className,
  ...props
}: UsersSexFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-56", className)}
        {...props}
      >
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

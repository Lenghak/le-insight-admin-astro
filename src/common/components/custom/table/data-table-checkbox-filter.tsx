import { Badge } from "@ui/badge";
import { buttonVariants } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Separator } from "@ui/separator";

import { cn } from "@/common/lib/utils";

import { FilterXIcon } from "lucide-react";
import * as React from "react";
import { useSearchParams } from "react-router-dom";

type DataTableCheckboxFilterProps = {
  label: React.ReactNode;
  trigger: React.ReactNode;
  checkboxes: {
    label: React.ReactNode;
    value: string;
  }[];
  queryName: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function DataTableCheckboxFilter({
  label,
  trigger,
  className,
  checkboxes,
  queryName,
  ...props
}: DataTableCheckboxFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams({
    [queryName]: queryName,
  });

  const selected = React.useMemo(
    () =>
      checkboxes.reduce(
        (acc, curr) =>
          searchParams.has(queryName, curr.value) ? acc + 1 : acc,
        0,
      ),
    [searchParams],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            size: "default",
            variant: "outline",
          }),
          "gap-4 bg-card",
        )}
      >
        {trigger}

        {!!selected && (
          <React.Fragment>
            <Separator
              orientation="vertical"
              className="h-4"
            />

            <Badge>{selected} Selected</Badge>
          </React.Fragment>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-56", className)}
        {...props}
      >
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="font-semibold">
          {checkboxes.map((item, index) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={searchParams.has(queryName, item.value)}
              onCheckedChange={(checked) => {
                setSearchParams((prev) => {
                  checked
                    ? prev.append(queryName, item.value)
                    : prev.delete(queryName, item.value);

                  return prev;
                });
              }}
              className="pl-8"
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex items-center gap-4 pl-4 font-bold text-destructive"
            onClick={() => {
              setSearchParams((prev) => {
                prev.delete(queryName);
                return prev;
              });
            }}
          >
            <FilterXIcon className="size-4 stroke-[3]" />
            <span>Clear Filter</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

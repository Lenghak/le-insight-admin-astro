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

import { Badge } from "@/common/components/ui/badge";
import { buttonVariants } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";

import { cn } from "@/common/lib/utils";

import { $urlStore, setURLStore } from "@/common/stores/url-store";
import { useStore } from "@nanostores/react";
import { FilterXIcon } from "lucide-react";
import * as React from "react";

type DataTableCheckboxFilterProps = {
  label: React.ReactNode;
  trigger: React.ReactNode;
  checkboxes: {
    label: string;
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
  const url = useStore($urlStore);

  const selected = React.useMemo(
    () =>
      checkboxes.reduce(
        (acc, curr) =>
          url.searchParams.has(queryName, curr.value) ? acc + 1 : acc,
        0,
      ),
    [url],
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
              checked={url.searchParams.has(queryName, item.value)}
              onCheckedChange={(checked) => {
                checked
                  ? url.searchParams.append(queryName, item.value)
                  : url.searchParams.delete(queryName, item.value);

                setURLStore(url);
              }}
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
              url.searchParams.delete("sex");
              setURLStore(url);
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

import { cn } from "@/common/lib/utils";

import useGetCategoriesListService from "@categories/hooks/use-get-categories-list-service";

import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@ui/command";
import { Input } from "@ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Small } from "@ui/small";

import { PopoverClose } from "@radix-ui/react-popover";
import { useDebounce } from "@uidotdev/usehooks";
import { CommandLoading } from "cmdk";
import { FilterXIcon, SearchIcon, TagIcon } from "lucide-react";
import React, { Fragment } from "react";
import { useSearchParams } from "react-router-dom";

export default function ArticleCategoriesFilters() {
  const [open, setOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchCategory, setSearchCategory] = React.useState<
    string | undefined
  >(undefined);
  const debounce = useDebounce(searchCategory, 500);

  const currentCategory = searchParams.get("category");

  const { data: res, isPending } = useGetCategoriesListService({
    q: debounce ?? undefined,
  });

  const categories = res?.data?.data;

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className={cn("h-9 bg-card px-4 font-bold")}
        >
          <div className="flex items-center gap-4">
            <TagIcon className="size-4 min-h-4 min-w-4" />
            {currentCategory ? (
              <Badge>{currentCategory}</Badge>
            ) : (
              <Small className="text-muted-foreground">Filter Category</Small>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        side="bottom"
        align="center"
      >
        <Command>
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Filter categories..."
              className={cn(
                "flex h-11 w-full rounded-md border-0 bg-transparent py-3 text-sm outline-none outline-0 placeholder:text-muted-foreground focus-visible:shadow-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
              )}
              onChange={(e) => setSearchCategory(e.currentTarget.value)}
            />
          </div>

          <CommandList>
            {isPending ? (
              <CommandEmpty>
                <CommandLoading />
              </CommandEmpty>
            ) : (
              <Fragment>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {categories?.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.label}
                      data-state={
                        category.label === currentCategory
                          ? "active"
                          : "inactive"
                      }
                      onSelect={(value) => {
                        setSearchParams(
                          { category: value, page: "1" },
                          { replace: true },
                        );
                        setOpen(false);
                      }}
                      className="data-[state=active]:font-extrabold"
                    >
                      <Small className="font-semibold capitalize leading-loose text-primary">
                        {category.label}
                      </Small>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Fragment>
            )}
          </CommandList>
        </Command>
        <PopoverClose asChild>
          <Button
            variant={"outline"}
            className="flex w-full items-center gap-4 rounded-none rounded-b-sm border-0 border-t bg-card pl-4 font-bold text-destructive"
            onClick={() => {
              setSearchParams((prev) => {
                prev.delete("category");
                return prev;
              });
            }}
          >
            <FilterXIcon className="size-4 stroke-[3]" />
            <span>Clear Filter</span>
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

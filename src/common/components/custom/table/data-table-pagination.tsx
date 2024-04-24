import { buttonVariants } from "@/common/components/ui/button";
import { PaginationEllipsis } from "@/common/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";

import { cn } from "@/common/lib/utils";

import { $urlStore, setURLStore } from "@/common/stores/url-store";
import { useStore } from "@nanostores/react";
import type { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

export type PaginatedItemsProps<TData> = ReactPaginateProps & {
  table: Table<TData>;
};

export default function DataTablePagination<TData>({
  className,
  activeClassName,
  activeLinkClassName,
  table,
  ...props
}: PaginatedItemsProps<TData>) {
  const url = useStore($urlStore);
  const searchParams = url.searchParams;

  return (
    <section
      className={cn("flex items-center justify-between pt-2", className)}
    >
      <div className="w-fit rounded-full border bg-card py-1 pl-1 pr-4 text-sm font-semibold text-muted-foreground">
        <span className="mr-1 inline-flex h-8 min-w-8 items-center justify-center rounded-full border bg-background p-2 font-bold text-foreground">
          {table.getFilteredSelectedRowModel().rows.length}
        </span>{" "}
        of{" "}
        <span className="mx-1 inline-flex h-8 min-w-8 items-center justify-center rounded-full border bg-background p-2 font-bold text-foreground">
          {table.getFilteredRowModel().rows.length}
        </span>{" "}
        row(s) selected.
      </div>

      <div className="w-fit rounded-full border bg-card p-1 text-sm font-semibold text-muted-foreground">
        <ReactPaginate
          onClick={({ nextSelectedPage, selected }) => {
            searchParams.set(
              "page",
              String(
                nextSelectedPage
                  ? nextSelectedPage + 1
                  : selected
                    ? selected + 1
                    : 1,
              ),
            );
            setURLStore(url);
          }}
          className={cn("flex w-fit items-center justify-center gap-2")}
          breakLabel={<PaginationEllipsis />}
          hrefBuilder={() => undefined}
          previousLabel={
            <div className="flex items-center gap-2">
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </div>
          }
          previousLinkClassName={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "aria-[disabled=true]:hover:bg-inherit aria-[disabled=true]:hover:text-muted-foreground size-9",
          )}
          nextLabel={
            <div className="flex items-center gap-2">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-4 w-4" />
            </div>
          }
          nextLinkClassName={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "aria-[disabled=true]:hover:bg-inherit aria-[disabled=true]:hover:text-muted-foreground size-9",
          )}
          disabledClassName="text-muted-foreground"
          pageClassName={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
          pageLinkClassName={cn(
            "font-semibold w-full h-full flex items-center justify-center rounded-full",
          )}
          activeClassName={cn(
            buttonVariants({
              size: "icon",
              variant: "default",
            }),
            "min-w-9 min-h-9 h-9 w-9 hover:text-primary-foreground",
            activeClassName,
          )}
          activeLinkClassName={cn(activeLinkClassName)}
          pageRangeDisplayed={1}
          renderOnZeroPageCount={null}
          forcePage={parseInt(searchParams.get("page") ?? "0") - 1}
          {...props}
        />
      </div>

      <div className="flex items-center gap-4 rounded-full border bg-card py-1 pl-4 pr-1">
        <p className="text-sm font-semibold text-muted-foreground">Rows</p>
        <Select
          value={`${searchParams.get("limit") ?? "50"}`}
          onValueChange={(value) => {
            searchParams.set("limit", value);
            searchParams.delete("page");
            setURLStore(url);
          }}
        >
          <SelectTrigger className="h-8 w-[70px] rounded-full font-bold">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                className="font-semibold"
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}

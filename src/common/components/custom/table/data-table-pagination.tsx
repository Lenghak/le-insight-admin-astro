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

export function DataTablePagination<TData>({
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
      className={cn("flex items-center justify-between px-4 py-2", className)}
    >
      <div className="flex-1 text-sm text-muted-foreground">
        <span className="font-bold">
          {table.getFilteredSelectedRowModel().rows.length}
        </span>{" "}
        of{" "}
        <span className="font-bold">
          {table.getFilteredRowModel().rows.length}
        </span>{" "}
        row(s) selected.
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${searchParams.get("limit") ?? "50"}`}
            onValueChange={(value) => {
              url.searchParams.set("limit", value);
              setURLStore(url);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ReactPaginate
          breakLabel={<PaginationEllipsis />}
          previousLabel={
            <div className="flex items-center gap-2">
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Previous</span>
            </div>
          }
          previousLinkClassName={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "aria-[disabled=true]:hover:bg-inherit aria-[disabled=true]:hover:text-muted-foreground",
          )}
          nextLabel={
            <div className="flex items-center gap-2">
              <span>Next</span>
              <ChevronRightIcon className="h-4 w-4" />
            </div>
          }
          nextLinkClassName={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "aria-[disabled=true]:hover:bg-inherit aria-[disabled=true]:hover:text-muted-foreground",
          )}
          disabledClassName="text-muted-foreground"
          pageClassName={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
          pageLinkClassName={cn(
            "font-semibold w-full h-full flex items-center justify-center rounded-full",
          )}
          activeClassName={cn(
            buttonVariants({
              size: "icon",
              variant: "outline",
            }),
            "min-w-9 min-h-9 h-9 w-9",
            activeClassName,
          )}
          activeLinkClassName={cn(activeLinkClassName)}
          pageRangeDisplayed={1}
          className={cn("flex w-fit items-center justify-center gap-2")}
          renderOnZeroPageCount={null}
          forcePage={parseInt(searchParams.get("page") ?? "1") - 1}
          {...props}
        />
      </div>
    </section>
  );
}

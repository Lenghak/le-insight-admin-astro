import ErrorSection from "@/modules/error/components/error-section";

import { DataTablePagination } from "@/common/components/custom/table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";

import { cn } from "@/common/lib/utils";

import UsersFilters from "@users/composites/users-filters";
import UsersTabs from "@users/composites/users-tabs";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { BoneIcon } from "lucide-react";
import React, { Fragment, memo } from "react";

import type { PaginationMetaType } from "@/common/types/pagination-type";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: PaginationMetaType;
  className?: string;
}

export default memo(function UsersDataTable<TData, TValue>({
  columns,
  className,
  data,
  meta,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Fragment>
      <div className="mt-4 flex h-fit items-center justify-between gap-6">
        <UsersTabs />
        <UsersFilters table={table} />
      </div>

      <div
        className={cn(
          "flex h-full min-h-96 w-dvw flex-col justify-between rounded-3xl",
          className,
        )}
      >
        <Table className="border-separate border-spacing-y-1 [&_tr]:border-b-0">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b-0 p-1"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="border-y bg-card first:rounded-l-full first:border first:border-r-0 last:rounded-r-full last:border last:border-l-0"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "p-2 px-4",
                        index === 0 && "border-t-4 border-t-background",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <ErrorSection
                    img={
                      <BoneIcon
                        size={96}
                        strokeWidth={2}
                        className="mb-4"
                      />
                    }
                    title="No users found!"
                    className="col-span-full row-span-full h-[50vh]"
                    description="There's no users found. Stay tune or browse more keywords for better results."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        table={table}
        pageCount={meta?.totalPages ?? 1}
        className="mt-2"
      />
    </Fragment>
  );
});

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

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import UsersFilters from "@users/composites/users-filters";
import UsersTabs from "@users/composites/users-tabs";
import React, { memo } from "react";
import { Fragment } from "react/jsx-runtime";

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
    getPaginationRowModel: getPaginationRowModel(),
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
          "flex h-full w-dvw flex-col justify-between overflow-hidden rounded-2xl border bg-card",
          className,
        )}
      >
        <Table className="h-full">
          <TableHeader className="bg-accent/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="p-2 px-4"
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
                  No results.
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

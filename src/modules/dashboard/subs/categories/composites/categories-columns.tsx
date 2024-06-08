import formatDate from "@/common/lib/date/format-date";
import { cn } from "@/common/lib/utils";

import CategoriesActions from "@categories/composites/categories-actions";
import { categoryStatus } from "@categories/constants/category-status";
import type { CategoriesTableType } from "@categories/types/categories-list-type";

import { Badge } from "@ui/badge";
import { Checkbox } from "@ui/checkbox";

import { DataTableColumnHeader } from "@custom/table";

import type { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";

import type { CategoriesStatusType } from "@/common/types/categories-type";

export const categoriesColumns: ColumnDef<CategoriesTableType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="h-[1.125rem] w-[1.125rem] rounded-full border-input [&>*>svg]:h-3 [&>span>svg]:w-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="h-[1.125rem] w-[1.125rem] rounded-full border-input [&>*>svg]:h-3 [&>span>svg]:w-3"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="No"
      />
    ),
    cell: function Cell({ row }) {
      const [searchParams] = useSearchParams();
      const page = parseInt(searchParams.get("page") ?? "1");
      const limit = parseInt(searchParams.get("limit") ?? "50");
      return (page - 1) * limit + (row.index + 1);
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
      />
    ),
    cell: ({ getValue, row }) => (
      <span
        className={cn(
          row.original.is_archived
            ? "font-bold italic text-muted-foreground line-through"
            : "",
        )}
      >
        {`${(getValue() as string).slice(0, 4)}...${(
          getValue() as string
        ).slice(-4)}`}
      </span>
    ),
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Label"
      />
    ),
    cell: ({ getValue, row }) =>
      getValue() ? (
        <span
          className={cn(
            "w-full text-center font-bold",
            row.original.is_archived &&
            "font-bold italic text-muted-foreground line-through",
          )}
        >
          {getValue() as string}
        </span>
      ) : (
        <span className="inline-block w-full text-center">-</span>
      ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
      />
    ),
    cell: ({ getValue, row }) =>
      row.original.is_archived ? (
        <Badge
          variant={"dot"}
          className="font-bold uppercase text-muted-foreground line-through before:bg-muted-foreground"
        >
          Archived
        </Badge>
      ) : (
        categoryStatus[getValue() as CategoriesStatusType]
      ),
  },
  {
    id: "n. assigned",
    accessorKey: "assigned_count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="N. Assigned"
      />
    ),
    cell: ({ row }) =>
      row?.original?.assigned_count >= 0 ? (
        <span
          className={cn(
            "w-full text-center font-bold",
            row?.original?.is_archived &&
            "font-bold uppercase text-muted-foreground line-through",
          )}
        >
          {row?.original?.assigned_count}
        </span>
      ) : (
        <span className="inline-block w-full">-</span>
      ),
  },
  {
    id: "n. generated",
    accessorKey: "generated_count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="N. Generated"
      />
    ),
    cell: ({ row }) =>
      row?.original?.generated_count >= 0 ? (
        <span
          className={cn(
            "w-full text-center font-bold",
            row?.original?.is_archived &&
            "font-bold uppercase text-muted-foreground line-through",
          )}
        >
          {row?.original?.generated_count}
        </span>
      ) : (
        <span className="inline-block w-full">-</span>
      ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Cre. Date"
      />
    ),
    cell: ({ getValue, row }) =>
      getValue() ? (
        <span
          className={cn(
            row?.original?.is_archived &&
            "font-bold italic text-muted-foreground line-through",
          )}
        >
          {formatDate(getValue() as string)}
        </span>
      ) : (
        <span className="inline-block w-full text-center">-</span>
      ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Up. Date"
      />
    ),
    cell: ({ getValue, row }) =>
      getValue() ? (
        <span
          className={cn(
            row?.original?.is_archived &&
            "font-bold italic text-muted-foreground line-through",
          )}
        >
          {formatDate(getValue() as string)}
        </span>
      ) : (
        <span className="inline-block w-full text-center">-</span>
      ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoriesActions row={row} />,
  },
];

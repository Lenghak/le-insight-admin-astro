import CategoriesActions from "@/modules/dashboard/subs/categories/composites/categories-actions";
import { categoryStatus } from "@/modules/dashboard/subs/categories/constants/category-status";
import type { CategoriesTableType } from "@/modules/dashboard/subs/categories/types/categories-list-type";

import { DataTableColumnHeader } from "@/common/components/custom/table";
import { Checkbox } from "@/common/components/ui/checkbox";

import formatDate from "@/common/lib/date/format-date";

import { type ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
      />
    ),
    cell: ({ getValue }) =>
      `${(getValue() as string).slice(0, 4)}...${(getValue() as string).slice(-4)}`,
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Label"
      />
    ),
    cell: ({ getValue }) =>
      getValue() ? (
        <span className="w-full text-center font-bold">
          {getValue() as string}
        </span>
      ) : (
        <span className="inline-block w-full text-center">-</span>
      ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
      />
    ),
    cell: ({ getValue }) =>
      getValue() ? (
        <span className="line-clamp-3 w-full">{getValue() as string}</span>
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
    cell: ({ getValue }) => categoryStatus[getValue() as CategoriesStatusType],
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
      row?.original?.assigned_count ? (
        <span className="w-full text-center font-bold">
          {row?.original?.assigned_count}
        </span>
      ) : (
        <span className="inline-block w-full text-center">-</span>
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
      row?.original?.generated_count ? (
        <span className="w-full text-center font-bold">
          {row?.original?.generated_count}
        </span>
      ) : (
        <span className="inline-block w-full text-center">-</span>
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
    cell: ({ getValue }) =>
      getValue() ? (
        formatDate(getValue() as string)
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
    cell: ({ getValue }) =>
      getValue() ? (
        formatDate(getValue() as string)
      ) : (
        <span className="inline-block w-full text-center">-</span>
      ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoriesActions row={row} />,
  },
];

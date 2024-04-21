import { DataTableColumnHeader } from "@/common/components/custom/table";
import { Checkbox } from "@/common/components/ui/checkbox";

import formatDate from "@/common/lib/date/format-date";

import { type ColumnDef } from "@tanstack/react-table";

export const categoriesColumns: ColumnDef<Record<string, unknown>>[] = [
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
        <span className="w-full text-center">{getValue() as string}</span>
      ) : (
        <span className="inline-block w-full text-center">-</span>
      ),
  },
  {
    id: "assigned",
    accessorKey: "assigned_count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Assigned"
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
    id: "generated",
    accessorKey: "generated_count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Assigned"
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
    // cell: ({ row }) => <UsersActions row={row} />,
  },
];

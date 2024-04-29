import { Checkbox } from "@ui/checkbox";

import { DataTableColumnHeader } from "@custom/table";

import { cn } from "@/common/lib/utils";

import { type ColumnDef } from "@tanstack/react-table";

export const articlesColumns: ColumnDef<Record<string, unknown>>[] = [
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
    cell: ({ getValue, row }) => (
      <span
        className={cn(
          row.original.is_archived
            ? "font-bold italic text-muted-foreground line-through"
            : "",
        )}
      >
        {`${(getValue() as string).slice(0, 4)}...${(getValue() as string).slice(-4)}`}
        ,
      </span>
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
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Cre. Date"
      />
    ),
    // cell: ({ getValue, row }) =>
    //   getValue() ? (
    //     <span
    //       className={cn(
    //         row?.original?.is_archived &&
    //           "font-bold italic text-muted-foreground line-through",
    //       )}
    //     >
    //       {formatDate(getValue() as string)}
    //     </span>
    //   ) : (
    //     <span className="inline-block w-full text-center">-</span>
    //   ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Up. Date"
      />
    ),
    // cell: ({ getValue, row }) =>
    //   getValue() ? (
    //     <span
    //       className={cn(
    //         row?.original?.is_archived &&
    //           "font-bold italic text-muted-foreground line-through",
    //       )}
    //     >
    //       {formatDate(getValue() as string)}
    //     </span>
    //   ) : (
    //     <span className="inline-block w-full text-center">-</span>
    //   ),
  },
  {
    id: "actions",
    // cell: ({ row }) => <CategoriesActions row={row} />,
  },
];

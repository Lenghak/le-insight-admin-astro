import { RolesBages } from "@/modules/dashboard/subs/users/constants/role-bage";
import { SexesBages } from "@/modules/dashboard/subs/users/constants/sex-badge";
import type { UsersTableType } from "@/modules/dashboard/subs/users/types/users-list-type";

import ProfileBadge from "@/common/components/custom/profile/profile-badge";
import { DataTableColumnHeader } from "@/common/components/custom/table";
import { Button } from "@/common/components/ui/button";
import { Checkbox } from "@/common/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";

import formatDate from "@/common/lib/date/format-date";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import type { ProfileSexType } from "@/common/types/profiles-type";
import type { UsersRoleType } from "@/common/types/users-type";

export const userColumns: ColumnDef<UsersTableType>[] = [
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
    accessorKey: "profile",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Profile"
      />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <ProfileBadge
          email={data.email}
          firstName={data.profile.first_name}
          lastName={data.profile.last_name}
          imageURL={data.profile.image_url ?? undefined}
        />
      );
    },
  },
  {
    accessorKey: "profile.sex",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Sex"
      />
    ),
    cell: ({ getValue }) => SexesBages[getValue() as ProfileSexType],
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
      />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Role"
      />
    ),
    cell: ({ getValue }) => RolesBages[getValue() as UsersRoleType],
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
      />
    ),
    cell: ({ getValue }) =>
      getValue() ?? <span className="inline-block w-full text-center">-</span>,
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
    cell: () => {
      // const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

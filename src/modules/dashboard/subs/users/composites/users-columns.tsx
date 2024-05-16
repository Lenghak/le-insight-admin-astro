import UsersActions from "@users/composites/users-actions";
import { rolesBadges } from "@users/constants/roles-badges";
import { sexesBages } from "@users/constants/sex-badges";
import type { UsersTableType } from "@users/types/users-list-type";

import { Checkbox } from "@ui/checkbox";

import ProfileBadge from "@custom/profile/profile-badge";
import { DataTableColumnHeader } from "@custom/table";

import formatDate from "@/common/lib/date/format-date";

import { type ColumnDef } from "@tanstack/react-table";

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
    id: "no",
    header: ({ column, }) => (
      <DataTableColumnHeader
        column={column}
        title="No"
      />
    ),
    cell: ({ row }) =>
      row.index + 1,
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
          meta={data.email}
          firstName={data.profile.first_name}
          lastName={data.profile.last_name}
          imageURL={data.profile.image_url ?? undefined}
          avatarFallBackClassName="bg-card"
        />
      );
    },
  },
  {
    id: "sex",
    accessorKey: "profile.sex",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Sex"
      />
    ),
    cell: ({ getValue }) => sexesBages[getValue() as ProfileSexType],
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
    cell: ({ getValue }) => rolesBadges[getValue() as UsersRoleType],
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
    cell: ({ row }) => <UsersActions row={row} />,
  },
];

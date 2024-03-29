import DataTable from "@/modules/dashboard/composites/dashboard-data-table";
import { userColumns } from "@/modules/dashboard/subs/users/composites/users-columns";
import useGetUsersListService from "@/modules/dashboard/subs/users/hooks/use-get-users-list-service";
import type { UsersListRequestType } from "@/modules/dashboard/subs/users/types/users-list-type";

type UsersTableProps = UsersListRequestType;

export default function UsersTable({ ...props }: UsersTableProps) {
  const { data: res } = useGetUsersListService(props);

  const users = res?.data?.data;

  return (
    <DataTable
      columns={userColumns}
      data={users ?? []}
      className="mt-4 w-full"
    />
  );
}

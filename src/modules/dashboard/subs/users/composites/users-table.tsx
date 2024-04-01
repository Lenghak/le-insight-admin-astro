import useUsersTableHandler from "@/modules/dashboard/subs/users/hooks/use-users-table-handler";

import DataTable from "@dashboard/composites/dashboard-data-table";
import DashboardSheet from "@dashboard/composites/dashboard-sheet";
import { userColumns } from "@dashboard/subs/users/composites/users-columns";
import { Fragment } from "react/jsx-runtime";

export default function UsersTable() {
  const { data: res } = useUsersTableHandler();

  const users = res?.data?.data;

  return (
    <Fragment>
      <DataTable
        columns={userColumns}
        data={users ?? []}
        className="mt-4 w-full"
      />

      <DashboardSheet />
    </Fragment>
  );
}

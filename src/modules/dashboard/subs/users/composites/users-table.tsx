import useUsersTableHandler from "@/modules/dashboard/subs/users/hooks/use-users-table-handler";

import DataTable from "@dashboard/composites/dashboard-data-table";
import DashboardSheet from "@dashboard/composites/dashboard-sheet";
import { userColumns } from "@dashboard/subs/users/composites/users-columns";
import { Fragment } from "react/jsx-runtime";

export default function UsersTable() {
  const { data: res } = useUsersTableHandler();
  return (
    <Fragment>
      <DataTable
        columns={userColumns}
        data={res?.data?.data ?? []}
        meta={res?.data?.meta?.pagination}
        className="mt-4 w-full"
      />

      <DashboardSheet />
    </Fragment>
  );
}

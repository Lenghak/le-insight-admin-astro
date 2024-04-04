import UsersDataTable from "@/modules/dashboard/subs/users/composites/users-data-table";
import useUsersTableHandler from "@/modules/dashboard/subs/users/hooks/use-users-table-handler";

import { userColumns } from "@dashboard/subs/users/composites/users-columns";
import { Fragment } from "react/jsx-runtime";

export default function UsersTable() {
  const { data: res } = useUsersTableHandler();

  return (
    <Fragment>
      <UsersDataTable
        columns={userColumns}
        data={res?.data?.data ?? []}
        meta={res?.data?.meta?.pagination}
        className="mt-4 w-full"
      />
    </Fragment>
  );
}

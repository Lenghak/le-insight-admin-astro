import DashboardTitle from "@/modules/dashboard/composites/dashboard-title";
import UsersCreateForm from "@/modules/dashboard/subs/users/composites/users-create-form";
import UsersTable from "@/modules/dashboard/subs/users/presenters/users-table";

import UsersBanForm from "@users/composites/users-ban-form";
import UsersEditForm from "@users/composites/users-edit-form";
import UsersSheet from "@users/composites/users-sheet";
import { Fragment } from "react";

export default function UsersRoute() {
  return (
    <Fragment>
      <div className="flex items-end justify-between">
        <DashboardTitle title="Users" />

        <div className="flex items-center justify-center gap-4">
          <UsersCreateForm />
        </div>
      </div>

      <UsersTable />

      <UsersSheet />

      <UsersEditForm />

      <UsersBanForm />
    </Fragment>
  );
}

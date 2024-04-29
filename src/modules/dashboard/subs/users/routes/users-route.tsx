import DashboardTitle from "@dashboard/composites/dashboard-title";

import UsersBanForm from "@users/composites/users-ban-form";
import UsersCreateForm from "@users/composites/users-create-form";
import UsersEditForm from "@users/composites/users-edit-form";
import UsersSheet from "@users/composites/users-sheet";
import UsersTable from "@users/presenters/users-table";

import { Fragment } from "react";

export default function UsersRoute() {
  return (
    <Fragment>
      <div className="flex items-end justify-between">
        <DashboardTitle
          title="Users"
          spa
        />

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

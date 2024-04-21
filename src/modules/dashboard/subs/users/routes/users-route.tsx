import DashboardTitle from "@/modules/dashboard/composites/dashboard-title";
import UsersTable from "@/modules/dashboard/subs/users/presenters/users-table";

import UsersBanForm from "@users/composites/users-ban-form";
import UsersEditForm from "@users/composites/users-edit-form";
import UsersSheet from "@users/composites/users-sheet";

import { Fragment } from "react";

export default function UsersRoute() {
  return (
    <Fragment>
      <DashboardTitle title="Users" />

      <UsersTable />

      <UsersSheet />

      <UsersEditForm />

      <UsersBanForm />
    </Fragment>
  );
}

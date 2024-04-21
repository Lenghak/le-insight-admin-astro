import DashboardTitle from "@/modules/dashboard/composites/dashboard-title";

import CategoriesTable from "@categories/presenters/categories-table";
import { Fragment } from "react";

export default function CategoriesRoute() {
  return (
    <Fragment>
      <DashboardTitle title="Categories" />

      <CategoriesTable />
    </Fragment>
  );
}

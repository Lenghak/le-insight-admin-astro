import DashboardTitle from "@/modules/dashboard/composites/dashboard-title";
import { DeleteCategoryForm } from "@/modules/dashboard/subs/categories/composites/categories-delete-form";

import CreateCategoriesForm from "@categories/composites/create-form";
import EditCategoriesForm from "@categories/composites/edit-form";
import CategoriesTable from "@categories/presenters/categories-table";

import { Fragment } from "react";

export default function CategoriesRoute() {
  return (
    <Fragment>
      <div className="flex items-end justify-between">
        <DashboardTitle title="Categories" />

        <div className="flex items-center justify-center gap-4">
          <CreateCategoriesForm />
        </div>
      </div>

      <CategoriesTable />

      <EditCategoriesForm />

      <DeleteCategoryForm />
    </Fragment>
  );
}

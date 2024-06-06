import { DeleteCategoryForm } from "@categories/composites/categories-delete-form";
import CreateCategoriesForm from "@categories/composites/create-form";
import EditCategoriesForm from "@categories/composites/edit-form";
import CategoriesTable from "@categories/presenters/categories-table";

import DashboardTitle from "@dashboard/composites/dashboard-title";

export default function CategoriesRoute() {
  return (
    <section className="flex h-full flex-col p-6 pb-4 pr-4">
      <div className="flex items-end justify-between">
        <DashboardTitle
          title="Categories"
          spa
        />

        <div className="flex items-center justify-center gap-4">
          <CreateCategoriesForm />
        </div>
      </div>

      <CategoriesTable />

      <EditCategoriesForm />

      <DeleteCategoryForm />
    </section>
  );
}

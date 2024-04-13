import { categoriesColumns } from "@/modules/dashboard/subs/categories/composites/categories-columns";
import CategoriesDataTable from "@/modules/dashboard/subs/categories/composites/categories-data-table";

import { Fragment } from "react/jsx-runtime";

export default function UsersTable() {
  return (
    <Fragment>
      <CategoriesDataTable
        columns={categoriesColumns}
        data={[]}
        className="mt-4 w-full"
      />
    </Fragment>
  );
}

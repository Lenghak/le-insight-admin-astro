import { categoriesColumns } from "@categories/composites/categories-columns";
import CategoriesDataTable from "@categories/composites/categories-data-table";
import { Fragment } from "react/jsx-runtime";

export default function CategoriesTable() {
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

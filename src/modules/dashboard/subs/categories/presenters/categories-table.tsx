import { categoriesColumns } from "@categories/composites/categories-columns";
import CategoriesDataTable from "@categories/composites/categories-data-table";
import useCategoriesListHandler from "@categories/hooks/use-get-categories-list-handler";

import { Fragment } from "react/jsx-runtime";

export default function CategoriesTable() {
	const { data: res } = useCategoriesListHandler();

	return (
		<Fragment>
			<CategoriesDataTable
				columns={categoriesColumns}
				data={res?.data.data ?? []}
				meta={res?.data?.meta}
				className="mt-4 w-full"
			/>
		</Fragment>
	);
}

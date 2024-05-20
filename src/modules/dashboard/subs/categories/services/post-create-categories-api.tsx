import type { CategoriesCreateType } from "@categories/types/categories-create-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function createCategoriesAPI(
	{ label }: CategoriesCreateType,
	queryInstance?: AxiosInstance,
) {
	return (queryInstance ?? getPublicQueryInstance()).post("/categories", {
		label,
	});
}

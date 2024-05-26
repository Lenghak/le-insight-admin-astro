import type { CategoriesRegenType } from "@categories/types/categories-regen-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function regenCategoriesAPI(
	{ article_id }: CategoriesRegenType,
	queryInstance?: AxiosInstance,
) {
	return (queryInstance ?? getPublicQueryInstance()).post(
		"/articles-categories/regenerate",
		{
			article_id,
		},
	);
}

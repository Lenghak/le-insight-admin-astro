import type {
	CategoriesRequestType,
	CategoriesResponseType,
} from "@categories/types/categories-ind-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default function getCategoryAPI(
	{ categoryID }: CategoriesRequestType,
	queryInstance?: AxiosInstance,
) {
	return (queryInstance ?? getPublicQueryInstance()).get<
		CategoriesResponseType,
		AxiosResponse<CategoriesResponseType>,
		CategoriesRequestType
	>(`/categories/${categoryID}`);
}

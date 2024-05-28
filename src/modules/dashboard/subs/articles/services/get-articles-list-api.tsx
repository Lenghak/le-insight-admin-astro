import type {
	ArticlesCategoriesListResponseType,
	ArticlesListRequestType,
} from "@articles/types/articles-list-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default async function getArticlesListAPI(
	pagination: ArticlesListRequestType,
	queryInstance?: AxiosInstance,
) {
	return (queryInstance ?? getPublicQueryInstance()).get<
		ArticlesListRequestType,
		AxiosResponse<ArticlesCategoriesListResponseType, never>,
		{ params: ArticlesListRequestType }
	>("/articles-categories", {
		params: pagination,
	});
}

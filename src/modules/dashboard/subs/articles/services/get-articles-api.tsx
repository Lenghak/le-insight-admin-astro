import type {
	ArticlesRequestType,
	ArticlesResponseType,
} from "@articles/types/articles-ind-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default function getArticleAPI(
	{ articleID }: ArticlesRequestType,
	queryInstance?: AxiosInstance,
) {
	return (queryInstance ?? getPublicQueryInstance()).get<
		ArticlesResponseType,
		AxiosResponse<ArticlesResponseType>,
		string
	>(`/articles/${articleID}`);
}

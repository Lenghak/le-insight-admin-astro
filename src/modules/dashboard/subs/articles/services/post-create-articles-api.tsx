import type { CreateArticleType } from "@articles/types/articles-create-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function createCategoriesAPI(
  data: CreateArticleType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).post(`/articles`, data);
}

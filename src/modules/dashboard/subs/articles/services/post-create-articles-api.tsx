import type { CreateArticleRequestType } from "@articles/types/articles-create-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function postCreateCategoriesAPI(
  data: CreateArticleRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).post(
    "/articles-categories",
    data,
  );
}

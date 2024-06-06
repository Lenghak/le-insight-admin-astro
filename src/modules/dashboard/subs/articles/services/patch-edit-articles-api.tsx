import type { UpdateArticleRequestType } from "@/modules/dashboard/subs/articles/types/articles-edit-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function patchEditArticlesAPI(
  id: string,
  data: UpdateArticleRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).patch(
    `/articles/${id}`,
    data,
  );
}

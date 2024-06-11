import type { CategoriesRegenType } from "@categories/types/categories-regen-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export default function postRegenCategoriesAPI(
  { article_id }: CategoriesRegenType,
  queryInstance?: AxiosInstance,
  config?: AxiosRequestConfig,
) {
  return (queryInstance ?? getPublicQueryInstance()).post(
    "/articles/recategorize",
    {
      article_id,
    },
    config,
  );
}

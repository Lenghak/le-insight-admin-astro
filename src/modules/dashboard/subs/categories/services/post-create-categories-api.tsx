import type { CategoriesCreateType } from "@/modules/dashboard/subs/categories/types/categories-ind-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function createCategoriesAPI(
  { description, label }: CategoriesCreateType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).post(`/categories`, {
    description,
    label,
  });
}

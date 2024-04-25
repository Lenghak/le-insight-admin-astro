import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { CategoriesCreateType } from "@categories/types/categories-create-type";
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

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function postCreateArticlesAPI(
  // { label }: CategoriesCreateType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).post(`/articles`, {

  });
}
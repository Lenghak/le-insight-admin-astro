import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default function getCategoryAPI(
  { categoryID }: Record<string, string>,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).get<
    Record<string, unknown>,
    AxiosResponse<Record<string, unknown>>,
    Record<string, string>
  >(`/articles/${categoryID}`);
}

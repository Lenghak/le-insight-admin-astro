import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default async function getCategoriesAPI(
  pagination: Record<string, unknown>,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).get<
    Record<string, unknown>,
    AxiosResponse<Record<string, unknown>, never>,
    { params: Record<string, unknown> }
  >("/articles", {
    params: pagination,
  });
}

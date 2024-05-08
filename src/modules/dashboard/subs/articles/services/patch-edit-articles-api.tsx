import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function patchEditCategoryAPI(
  { id }: Record<string, string>,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).patch(`/articles/${id}`);
}

import type { CategoryEditRequestType } from "@/modules/dashboard/subs/categories/types/categories-edit-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function patchEditCategoryAPI(
  { id, label, status }: CategoryEditRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).patch(
    `/categories/${id}`,
    {
      label,
      status,
    },
  );
}

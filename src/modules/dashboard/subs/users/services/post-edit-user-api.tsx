import type { UserEditRequestType } from "@/modules/dashboard/subs/users/types/users-edit-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function postEditUserAPI(
  { id, role }: UserEditRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).post(`/users/${id}`, {
    role: role,
  });
}

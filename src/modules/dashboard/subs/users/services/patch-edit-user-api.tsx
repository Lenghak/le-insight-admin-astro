import type { UserEditRequestType } from "@users/types/users-edit-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function patchEditUserAPI(
  { id, role, banned_at, banned_until }: UserEditRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).patch(`/users/${id}`, {
    role: role,
    banned_at: banned_at,
    banned_until: banned_until,
  });
}

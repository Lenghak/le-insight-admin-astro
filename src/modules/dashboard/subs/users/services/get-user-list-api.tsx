import type {
  UsersListRequestType,
  UsersListResponseType,
} from "@/modules/dashboard/subs/users/types/users-list-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default async function getUsersAPI(
  pagination: UsersListRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).get<
    UsersListResponseType,
    AxiosResponse<UsersListResponseType, never>,
    { params: UsersListRequestType }
  >("/users", {
    params: pagination,
  });
}

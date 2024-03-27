import type { UsersListResponseType } from "@/modules/dashboard/subs/users/types/users-list-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

import type { PaginationRequestType } from "@/common/types/pagination-type";

export default async function getUsersAPI(
  pagination: PaginationRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).get<
    UsersListResponseType,
    AxiosResponse<UsersListResponseType, never>,
    { params: PaginationRequestType }
  >("/users", {
    params: pagination,
  });
}

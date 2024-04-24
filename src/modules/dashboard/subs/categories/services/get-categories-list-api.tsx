import { getPublicQueryInstance } from "@/common/stores/api-store";
import type {
  CategoriesListRequestType,
  CategoriesListResponseType,
} from "@categories/types/categories-list-type";
import type { UsersListResponseType } from "@users/types/users-list-type";
import type { AxiosInstance, AxiosResponse } from "axios";

export default async function getCategoriesAPI(
  pagination: CategoriesListRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).get<
    CategoriesListResponseType,
    AxiosResponse<UsersListResponseType, never>,
    { params: CategoriesListRequestType }
  >("/categories", {
    params: pagination,
  });
}

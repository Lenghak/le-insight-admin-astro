import type { SensitivitiesListRequestType, SensitivitiesListResponseType } from "@sensitivities/types/sensitivities-list-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default async function getSensitivitiesListAPI(
  pagination: SensitivitiesListRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).get<
    SensitivitiesListResponseType,
    AxiosResponse<SensitivitiesListResponseType, never>,
    { params: SensitivitiesListRequestType }
  >("/sensitivities", {
    params: pagination,
  });
}

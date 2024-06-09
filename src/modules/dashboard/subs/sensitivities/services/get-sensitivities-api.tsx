import type {
  SensitivitiesRequestType,
  SensitivitiesResponseType,
} from "@sensitivities/types/sensitivities-ind-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default function getSensitivitiesAPI(
  { sensitivityId: categoryID }: SensitivitiesRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).get<
    SensitivitiesResponseType,
    AxiosResponse<SensitivitiesResponseType>,
    SensitivitiesRequestType
  >(`/categories/${categoryID}`);
}

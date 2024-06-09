import type { SensitivitiesCreateType } from "@sensitivities/types/sensitivities-create-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function postCreateSensitivitiesAPI(
  { label }: SensitivitiesCreateType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).post("/sensitivities", {
    label,
    status: "ACTIVE",
  });
}

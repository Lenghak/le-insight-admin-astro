import type { SensitivitiesEditRequestType } from "@sensitivities/types/sensitivities-edit-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function patchEditSensitivitiesAPI(
  { id, label, status }: SensitivitiesEditRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).patch(
    `/sensitivities/${id}`,
    {
      label,
      status,
    },
  );
}

import type { SensitivitiesRegenType } from "@sensitivities/types/sensitivities-regen-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export default function postRegenSensitivitiesAPI(
  { article_id }: SensitivitiesRegenType,
  queryInstance?: AxiosInstance,
  config?: AxiosRequestConfig,
) {
  return (queryInstance ?? getPublicQueryInstance()).post(
    "/sensitivities/regenerate",
    {
      article_id,
    },
    config,
  );
}

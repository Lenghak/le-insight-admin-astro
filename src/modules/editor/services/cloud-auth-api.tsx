import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { CloudAuthResponseType } from "@editor/types/cloud-auth-schema";
import type { AxiosInstance, AxiosResponse } from "axios";

export default async function getCloudAuthToken(queryInstance?: AxiosInstance) {
  return (queryInstance ?? getPublicQueryInstance()).get<
    CloudAuthResponseType,
    AxiosResponse<CloudAuthResponseType>,
    never
  >("/articles/cloud");
}

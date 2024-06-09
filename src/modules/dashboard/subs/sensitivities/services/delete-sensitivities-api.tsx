import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function deleteSensitivitiesAPI(
  { id }: { id: string },
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).delete(
    `/sensitivities/${id}`,
  );
}

import {
  ConfirmEmailRequestSchema,
  type ConfirmEmailRequestType,
} from "@auth/types/confirm-email-schema";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default async function postConfirmEmail(
  confirmEmailRequest: ConfirmEmailRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).post<
    unknown,
    AxiosResponse<unknown>,
    ConfirmEmailRequestType
  >("/auth/confirm", ConfirmEmailRequestSchema.parse(confirmEmailRequest));
}

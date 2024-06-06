import {
  ResetPasswordRequestSchema,
  type ResetPasswordRequestType,
  type ResetPasswordResponseType,
} from "@/modules/auth/types/reset-password-schema";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default async function postResetPassword(
  resetPasswordRequest: ResetPasswordRequestType,
  queryInstance?: AxiosInstance,
) {
  return (queryInstance ?? getPublicQueryInstance()).post<
    ResetPasswordResponseType,
    AxiosResponse<ResetPasswordResponseType>,
    ResetPasswordRequestType
  >(
    "/auth/recovery-password",
    ResetPasswordRequestSchema.parse(resetPasswordRequest),
  );
}

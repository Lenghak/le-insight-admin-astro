import { userKeys } from "@/modules/dashboard/subs/users/constants/query-keys";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { queryClient } from "@/common/stores/api-store";
import { useMutation } from "@tanstack/react-query";
import postEditUserAPI from "@users/services/post-edit-user-api";
import type { UserEditRequestType } from "@users/types/users-edit-type";

export default function useEditUserService() {
  const instance = usePrivateQueryInstance();

  return useMutation(
    {
      mutationKey: [...userKeys.detail(`edit`), instance],
      mutationFn: async (data: UserEditRequestType) =>
        await postEditUserAPI(data),
    },
    queryClient,
  );
}

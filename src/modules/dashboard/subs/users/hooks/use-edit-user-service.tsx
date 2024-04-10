import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { userKeys } from "@users/constants/query-keys";
import patchEditUserAPI from "@users/services/post-edit-user-api";
import type { UserEditRequestType } from "@users/types/users-edit-type";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useEditUserService() {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useMutation(
    {
      mutationKey: [...userKeys.detail(`edit`), instance],
      mutationFn: async (data: UserEditRequestType) =>
        await patchEditUserAPI(data),
      onError: (error) => {
        if (error instanceof AxiosError && error.status === 400)
          toast.error("Validation Failed", {
            duration: 10 * 1000,
            description:
              "The input in not acceptable. Please check and try again.",
            closeButton: true,
          });
        else {
          toast.error("Editing Failed", {
            duration: 10 * 1000,
            description:
              "There was a problem while banning this user. Please try again later",
            closeButton: true,
          });
        }
      },
      onSuccess: () => {
        toast.success("Data modified successfully", {
          duration: 10 * 1000,
          description:
            "The new data has been successfully updated. You may see the result shortly.",
          closeButton: true,
        });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: [...userKeys.all],
          exact: false,
          stale: true,
        });
        window.history.replaceState(null, "", location.toString());
      },
    },
    queryClient,
  );
}

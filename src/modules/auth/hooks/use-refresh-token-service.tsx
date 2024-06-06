import { authKeys } from "@/modules/auth/constants/query-keys";
import postRefreshToken from "@/modules/auth/services/refresh-token-api";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "auth-astro/client";
import type { AxiosInstance } from "axios";
import { toast } from "sonner";

export default function useRefreshTokenService() {
  const queryClient = useStore($queryClient);
  return useMutation(
    {
      mutationKey: authKeys.operation("refresh"),
      mutationFn: async (queryInstance?: AxiosInstance | undefined) =>
        await postRefreshToken(queryInstance),
      onError: async () => {
        const title = "Refreshed Failed";
        const description =
          "You will be redirecting to the sign in page. Please re-sign in";

        toast.error(title, {
          duration: 10 * 1000,
          description: description,
          closeButton: true,
        });

        await signOut({ redirect: true, callbackUrl: "/auth/sign-in" });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: [...authKeys.all],
          exact: false,
          stale: true,
        });
      },
    },
    queryClient,
  );
}

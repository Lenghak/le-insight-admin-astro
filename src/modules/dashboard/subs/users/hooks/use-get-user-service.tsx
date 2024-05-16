import { userKeys } from "@users/constants/query-keys";
import getUserAPI from "@users/services/get-user-api";
import type { UsersRequestType } from "@users/types/users-ind-type";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserService({ userID }: UsersRequestType) {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useQuery(
    {
      queryKey: [...userKeys.detail(userID), instance],
      queryFn: async () => (await getUserAPI({ userID }, instance)) ?? null,
      enabled: userID !== undefined,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
    queryClient,
  );
}

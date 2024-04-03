import { userKeys } from "@/modules/dashboard/subs/users/constants/query-keys";
import getUserAPI from "@/modules/dashboard/subs/users/services/get-user-api";
import type { UsersRequestType } from "@/modules/dashboard/subs/users/types/users-ind-type";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { queryClient } from "@/common/stores/api-store";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserService({ userID }: UsersRequestType) {
  const instance = usePrivateQueryInstance();

  return useQuery(
    {
      queryKey: [...userKeys.detail(userID), instance],
      queryFn: async () => (await getUserAPI({ userID }, instance)) ?? null,
      enabled: userID !== undefined,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    queryClient,
  );
}

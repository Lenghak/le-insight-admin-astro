import { userKeys } from "@users/constants/query-keys";
import getUsersAPI from "@users/services/get-user-list-api";
import type { UsersListRequestType } from "@users/types/users-list-type";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function useGetUsersListService({
  ...params
}: UsersListRequestType) {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useQuery(
    {
      queryKey: [
        ...userKeys.list(
          ...Object.entries(params)
            .map((item) => item.toString())
            .flat(),
        ),
        instance,
        params,
      ],
      queryFn: async () => (await getUsersAPI(params, instance)) ?? null,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    queryClient,
  );
}

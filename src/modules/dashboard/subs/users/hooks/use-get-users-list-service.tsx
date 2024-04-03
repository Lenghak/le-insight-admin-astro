import { userKeys } from "@/modules/dashboard/subs/users/constants/query-keys";
import getUsersAPI from "@/modules/dashboard/subs/users/services/get-user-list-api";
import type { UsersListRequestType } from "@/modules/dashboard/subs/users/types/users-list-type";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { queryClient } from "@/common/stores/api-store";
import { useQuery } from "@tanstack/react-query";

export default function useGetUsersListService({
  limit,
  page,
  q,
  role,
  "sex[]": sex,
}: UsersListRequestType) {
  const instance = usePrivateQueryInstance();

  return useQuery(
    {
      queryKey: [
        ...userKeys.list(
          `limit=${limit}&page=${page}&q=${q}&role=${role}&sex=${sex?.toString()}`,
        ),
        instance,
        sex,
      ],
      queryFn: async () =>
        (await getUsersAPI({ limit, page, q, role, "sex[]": sex }, instance)) ??
        null,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    queryClient,
  );
}

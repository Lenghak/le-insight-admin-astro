import { userKeys } from "@/modules/dashboard/subs/users/constants/query-keys";
import getUsersAPI from "@/modules/dashboard/subs/users/services/get-user-list-api";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { queryClient } from "@/common/stores/api-store";
import { useQuery } from "@tanstack/react-query";

import type { PaginationRequestType } from "@/common/types/pagination-type";

export default function useGetUsersListService({
  limit,
  page,
  q,
}: PaginationRequestType) {
  const instance = usePrivateQueryInstance();
  return useQuery(
    {
      queryKey: [
        ...userKeys.list(`limit=${limit}&page=${page}q=${q}`),
        instance,
      ],
      queryFn: async () => await getUsersAPI({ limit, page, q }, instance),
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    queryClient,
  );
}

import getArticlesListAPI from "@articles/services/get-articles-list-api";
import type { ArticlesListRequestType } from "@articles/types/articles-list-type";

import { categoriesKeys } from "@categories/constants/query-keys";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function useGetArticlesListService({
  ...params
}: ArticlesListRequestType) {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useQuery(
    {
      queryKey: [
        ...categoriesKeys.list(
          ...Object.entries(params)
            .map((item) => item.toString())
            .flat(),
        ),
        instance,
        params,
      ],
      queryFn: async () => (await getArticlesListAPI(params, instance)) ?? null,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    queryClient,
  );
}

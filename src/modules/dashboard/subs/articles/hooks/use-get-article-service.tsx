import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { articleKeys } from "@articles/constants/query-keys";
import getArticleAPI from "@articles/services/get-articles-api";
import type { ArticlesRequestType } from "@articles/types/articles-ind-type";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function useGetArticleService({
  articleID,
}: ArticlesRequestType) {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useQuery(
    {
      queryKey: [...articleKeys.detail(articleID), instance],
      queryFn: async () =>
        (await getArticleAPI({ articleID }, instance)) ?? null,
      enabled: articleID !== undefined,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    queryClient,
  );
}

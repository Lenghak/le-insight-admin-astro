import { categoriesKeys } from "@categories/constants/query-keys";
import getCategoryAPI from "@categories/services/get-category-api";
import type { CategoriesRequestType } from "@categories/types/categories-ind-type";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategoryService({
  categoryID,
}: CategoriesRequestType) {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useQuery(
    {
      queryKey: [...categoriesKeys.detail(categoryID), instance],
      queryFn: async () =>
        (await getCategoryAPI({ categoryID }, instance)) ?? null,
      enabled: categoryID !== undefined,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    queryClient,
  );
}

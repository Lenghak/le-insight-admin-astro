import { categoriesKeys } from "@categories/constants/query-keys";
import getCategoriesAPI from "@categories/services/get-categories-list-api";
import type { CategoriesListRequestType } from "@categories/types/categories-list-type";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategoriesListService({
	...params
}: CategoriesListRequestType) {
	const instance = usePrivateQueryInstance();
	const queryClient = useStore($queryClient);

	return useQuery(
		{
			queryKey: [
				...categoriesKeys.list(
					...Object.entries(params).flatMap((item) => item.toString()),
				),
				instance,
				params,
			],
			queryFn: async () => (await getCategoriesAPI(params, instance)) ?? null,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
		},
		queryClient,
	);
}

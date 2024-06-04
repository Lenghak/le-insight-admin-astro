import { articleKeys } from "@articles/constants/query-keys";
import postEnhanceArticleApi from "@articles/services/post-enhance-articles-api";
import type { ArticlesEnhanceRequestType } from "@articles/types/articles-enhance-type";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";

export default function usePostEnhanceArticlesService() {
	const instance = usePrivateQueryInstance();
	const queryClient = useStore($queryClient);

	return useMutation(
		{
			mutationKey: [...articleKeys.detail("enhance"), instance],
			mutationFn: async (params: ArticlesEnhanceRequestType) =>
				await postEnhanceArticleApi(params, instance),
		},
		queryClient,
	);
}

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { articleKeys } from "@articles/constants/query-keys";
import postEnhanceArticleApi from "@articles/services/post-enhance-articles-api";
import type { ArticlesEnhanceRequestType } from "@articles/types/articles-enhance-type";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";

export default function usePostEnhanceArticlesService() {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useMutation(
    {
      mutationKey: [...articleKeys.detail("enhance"), instance],
      mutationFn: async (data: {
        params: ArticlesEnhanceRequestType,
        config?: AxiosRequestConfig,
      }) => await postEnhanceArticleApi(data.params, instance, data.config),
    },
    queryClient,
  );
}

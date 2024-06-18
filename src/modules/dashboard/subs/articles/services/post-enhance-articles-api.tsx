import { $articleAiResultStore } from "@/modules/dashboard/subs/articles/stores/article-ai-store";

import type { ArticlesEnhanceRequestType } from "@articles/types/articles-enhance-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

export default async function postEnhanceArticleApi(
  params: ArticlesEnhanceRequestType,
  queryInstance?: AxiosInstance,
  config?: AxiosRequestConfig,
) {
  return (queryInstance ?? getPublicQueryInstance()).post(
    "/enhancements" + params.path,
    { content: params.content },
    {
      responseType: "text",
      headers: {
        Accept: "*",
      },
      onDownloadProgress: (e) => {
        const resBody = (
          (e.event as ProgressEvent<XMLHttpRequest>)
            .currentTarget as XMLHttpRequest
        ).response as string;

        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const parsed = JSON.parse(resBody);
          if (parsed instanceof AxiosError) {
            return;
          }
        } catch (_) { }

        try {
          $articleAiResultStore.set(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            JSON.parse(resBody.slice(resBody.lastIndexOf('{"output":'))),
          );
        } catch (_) { }
      },
      ...config,
    },
  );
}

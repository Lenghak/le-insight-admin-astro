import { articleKeys } from "@articles/constants/query-keys";
import postCreateCategoriesAPI from "@articles/services/post-create-articles-api";
import type { CreateArticleRequestType } from "@articles/types/articles-create-type";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useCreateArticleService() {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useMutation(
    {
      mutationKey: [...articleKeys.detail(`create`), instance],
      mutationFn: async (data: CreateArticleRequestType) =>
        await postCreateCategoriesAPI(data),
      onError: (error) => {
        let title = "Editing Failed";
        let description =
          "There was a problem while processing your action. Please try again later.";

        if (error instanceof AxiosError && error.response?.status === 400) {
          title = "Validation Failed";
          description =
            "The input in not acceptable. Please check and try again.";
        }

        if (error instanceof AxiosError && error.response?.status === 409) {
          title = "Category already exist";
          description =
            "The input in not acceptable. Please check and try again.";
        }

        toast.error(title, {
          duration: 10 * 1000,
          description: description,
          closeButton: true,
        });
      },
      onSuccess: () => {
        toast.success("Articles created successfully", {
          duration: 10 * 1000,
          description:
            "The new data has been successfully uploaded. You may see the result very shortly.",
          closeButton: true,
        });
      },

      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: [...articleKeys.all],
          exact: false,
          stale: true,
        });
      },
    },
    queryClient,
  );
}

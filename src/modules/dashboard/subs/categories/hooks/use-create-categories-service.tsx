import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { $queryClient } from "@/common/stores/api-store";
import { categoriesKeys } from "@categories/constants/query-keys";
import createCategoriesAPI from "@categories/services/post-create-categories-api";
import type { CategoriesCreateType } from "@categories/types/categories-ind-type";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useCreateCategoryService() {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useMutation(
    {
      mutationKey: [...categoriesKeys.detail(`edit`), instance],
      mutationFn: async (data: CategoriesCreateType) =>
        await createCategoriesAPI(data),
      onError: (error) => {
        if (error instanceof AxiosError && error.status === 400)
          toast.error("Validation Failed", {
            duration: 10 * 1000,
            description:
              "The input in not acceptable. Please check and try again.",
            closeButton: true,
          });
        else {
          toast.error("Editing Failed", {
            duration: 10 * 1000,
            description:
              "There was a problem while processing your action. Please try again later",
            closeButton: true,
          });
        }
      },
      onSuccess: () => {
        toast.success("Data modified successfully", {
          duration: 10 * 1000,
          description:
            "The new data has been successfully updated. You may see the result very shortly.",
          closeButton: true,
        });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: [...categoriesKeys.all],
          exact: false,
          stale: true,
        });
        window.history.replaceState(null, "", location.toString());
      },
    },
    queryClient,
  );
}

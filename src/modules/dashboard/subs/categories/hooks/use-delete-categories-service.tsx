import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { categoriesKeys } from "@categories/constants/query-keys";
import deleteCategoryAPI from "@categories/services/delete-categories-api";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useDeleteCategoryService() {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useMutation(
    {
      mutationKey: [...categoriesKeys.detail("delete"), instance],
      mutationFn: async ({ id }: { id: string }) =>
        await deleteCategoryAPI({ id }),

      onError: (error) => {
        let title = "Deleting Failed";
        let description =
          "There was a problem while processing your action. Please try again later.";

        if (error instanceof AxiosError && error.response?.status === 400) {
          title = "Validation Failed";
          description =
            "The input in not acceptable. Please check and try again.";
        }

        if (error instanceof AxiosError && error.response?.status === 404) {
          title = "Category has already been deleted";
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
        toast.success("Data modified successfully", {
          duration: 10 * 1000,
          description:
            "The new data has been successfully updated. You may see the result shortly.",
          closeButton: true,
        });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: [...categoriesKeys.all],
          exact: false,
          stale: true,
        });
      },
    },
    queryClient,
  );
}

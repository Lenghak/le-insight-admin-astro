import postRegenCategoriesAPI from "@/modules/dashboard/subs/categories/services/post-regen-categories-api";

import { Button } from "@/common/components/ui/button";

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { articleKeys } from "@articles/constants/query-keys";

import type { CategoriesRegenType } from "@categories/types/categories-regen-type";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, isAxiosError, type AxiosRequestConfig } from "axios";
import { CheckCircleIcon, CircleXIcon } from "lucide-react";
import { toast } from "sonner";

export default function useRegenCategoriesService({
  article_id,
}: CategoriesRegenType) {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useMutation(
    {
      mutationKey: ["regen-categories", article_id, instance],
      mutationFn: async (config?: AxiosRequestConfig) =>
        await postRegenCategoriesAPI({ article_id }, instance, config),
      onError: (error) => {
        if (isAxiosError(error) && error.code === AxiosError.ERR_CANCELED) {
          toast.dismiss("REGEN_CATEGORY_" + article_id);
          return;
        }

        let title = "Regenerate Failed";
        let description =
          "There was a problem while processing your action. Please try again later.";

        if (error instanceof AxiosError && error.response?.status === 400) {
          title = "Validation Failed";
          description =
            "The input in not acceptable. Please check and try again.";
        }

        if (error instanceof AxiosError && error.response?.status === 409) {
          title = "Category already applied";
          description =
            "The input in not acceptable. Please check and try again.";
        }

        toast.error(title, {
          id: "REGEN_CATEGORY_" + article_id,
          duration: 10 * 1000,
          description: description,
          closeButton: true,
          icon: (
            <CircleXIcon className="size-5 fill-primary-foreground text-primary" />
          ),
          action: <></>,
        });
      },
      onSuccess: () => {
        toast.success("Data modified successfully", {
          id: "REGEN_CATEGORY_" + article_id,
          duration: 10 * 1000,
          description:
            "The new data has been successfully updated. You may see the result very shortly.",
          closeButton: true,
          icon: (
            <CheckCircleIcon className="size-5 fill-primary-foreground text-primary" />
          ),
          action: (
            <Button
              variant={"outline"}
              className="font-bold text-foreground"
              size={"sm"}
              onClick={async () => {
                await queryClient.invalidateQueries({
                  queryKey: [...articleKeys.all],
                  exact: false,
                  stale: true,
                });
                toast.dismiss();
              }}
            >
              Reload
            </Button>
          ),
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

import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";
import { $queryClient } from "@/common/stores/api-store";
import { articleKeys } from "@articles/constants/query-keys";
import { categoriesKeys } from "@categories/constants/query-keys";
import regenCategoriesAPI from "@categories/services/regen-categories-api";
import type { CategoriesRegenType } from "@categories/types/categories-regen-type";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useRegenCateService({
	article_id,
}: CategoriesRegenType) {
	const instance = usePrivateQueryInstance();
	const queryClient = useStore($queryClient);

	return useMutation(
		{
			mutationKey: [...categoriesKeys.detail(article_id), , instance],
			mutationFn: async () => await regenCategoriesAPI({ article_id }),
			onError: (error) => {
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
					duration: 10 * 1000,
					description: description,
					closeButton: true,
				});
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
					queryKey: [...articleKeys.all, instance],
					exact: false,
					stale: true,
				});
			},
		},
		queryClient,
	);
}

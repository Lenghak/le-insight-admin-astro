import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function deleteCategoryAPI(
	{ id }: { id: string },
	queryInstance?: AxiosInstance,
) {
	return (queryInstance ?? getPublicQueryInstance()).delete(
		`/categories/${id}`,
	);
}

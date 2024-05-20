import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance } from "axios";

export default function archiveArticleAPI(
	{ id }: { id: string },
	queryInstance?: AxiosInstance,
) {
	return (queryInstance ?? getPublicQueryInstance()).delete(`/articles/${id}`);
}

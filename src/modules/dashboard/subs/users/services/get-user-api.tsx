import type {
	UsersRequestType,
	UsersResponseType,
} from "@users/types/users-ind-type";

import { getPublicQueryInstance } from "@/common/stores/api-store";
import type { AxiosInstance, AxiosResponse } from "axios";

export default function getUserAPI(
	{ userID }: UsersRequestType,
	queryInstance?: AxiosInstance,
) {
	return (queryInstance ?? getPublicQueryInstance()).get<
		UsersResponseType,
		AxiosResponse<UsersResponseType>,
		UsersRequestType
	>(`/users/${userID}`);
}

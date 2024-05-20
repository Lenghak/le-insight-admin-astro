import useGetUsersListService from "@users/hooks/use-get-users-list-service";

import { useSearchParams } from "react-router-dom";

import type { ProfileSexType } from "@/common/types/profiles-type";
import type { UsersRoleType } from "@/common/types/users-type";

type DateRange = string | Date | null | undefined;

export default function useUsersTableHandler() {
	const [searchParams] = useSearchParams();

	const role = searchParams.get("role") ?? undefined;
	const page = Number.parseInt(searchParams.get("page") ?? "1");
	const limit = Number.parseInt(searchParams.get("limit") ?? "50");
	const q = searchParams.get("q") ?? undefined;
	const sex = (searchParams.getAll("sex") as ProfileSexType[]) ?? undefined;

	let rfrom: DateRange = searchParams.get("from") ?? undefined;
	let rto: DateRange = searchParams.get("to") ?? undefined;

	try {
		rfrom = rfrom ? new Date(rfrom) : undefined;
		rto = rto ? new Date(rto) : undefined;
	} catch (err) {
		rfrom = undefined;
		rto = undefined;
	}

	return useGetUsersListService({
		role: role !== "ALL" ? (role as UsersRoleType) : null,
		page,
		limit,
		q,
		sex,
		from: (rfrom as Date)?.toISOString(),
		to: (rto as Date)?.toISOString(),
	});
}

import { $urlStore } from "@/common/stores/url-store";
import { useStore } from "@nanostores/react";
import useGetUsersListService from "@users/hooks/use-get-users-list-service";

import type { ProfileSexType } from "@/common/types/profiles-type";
import type { UsersRoleType } from "@/common/types/users-type";

type DateRange = string | Date | null | undefined;

export default function useUsersTableHandler() {
  const url = useStore($urlStore);

  const role = url.searchParams.get("role") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "50");
  const q = url.searchParams.get("q") ?? undefined;
  const sex =
    (url.searchParams.getAll("sex[]") as ProfileSexType[]) ?? undefined;

  let rfrom: DateRange = url.searchParams.get("from") ?? undefined;
  let rto: DateRange = url.searchParams.get("to") ?? undefined;

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
    "sex[]": sex,
    from: (rfrom as Date)?.toISOString(),
    to: (rto as Date)?.toISOString(),
  });
}

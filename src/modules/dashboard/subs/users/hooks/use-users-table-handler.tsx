import { $urlStore } from "@/common/stores/url-store";
import useGetUsersListService from "@dashboard/subs/users/hooks/use-get-users-list-service";
import { useStore } from "@nanostores/react";

import type { ProfileSexType } from "@/common/types/profiles-type";
import type { UsersRoleType } from "@/common/types/users-type";

export default function useUsersTableHandler() {
  const url = useStore($urlStore);

  const role = url.searchParams.get("role") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "50");
  const q = url.searchParams.get("q") ?? undefined;
  const sex =
    (url.searchParams.getAll("sex[]") as ProfileSexType[]) ?? undefined;

  return useGetUsersListService({
    role: role !== "ALL" ? (role as UsersRoleType) : null,
    page,
    limit,
    q,
    "sex[]": sex,
  });
}

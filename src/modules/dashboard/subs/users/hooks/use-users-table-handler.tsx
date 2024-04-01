import { $urlStore } from "@/common/stores/url-store";
import useGetUsersListService from "@dashboard/subs/users/hooks/use-get-users-list-service";
import { useEffect, useState } from "react";

import type { UsersRoleType } from "@/common/types/users-type";

export default function useUsersTableHandler() {
  const [url, setURLState] = useState($urlStore.get());

  useEffect(() => {
    const unSub = $urlStore.subscribe((value) => {
      setURLState(value);
    });
    return unSub;
  }, []);

  const role = url.searchParams.get("role") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = parseInt(url.searchParams.get("limit") ?? "50");
  const q = url.searchParams.get("q") ?? undefined;

  return useGetUsersListService({
    role: role !== "ALL" ? (role as UsersRoleType) : null,
    page,
    limit,
    q,
  });
}

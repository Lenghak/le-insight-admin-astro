import DashboardSheet from "@/modules/dashboard/composites/dashboard-sheet";
import {
  $dashboardSheetStore,
  setDashboardSheetOpen,
} from "@/modules/dashboard/stores/dashboard-sheet-store";
import UsersInfoSkeleton from "@/modules/dashboard/subs/users/components/users-info-skeleton";
import useGetUserService from "@/modules/dashboard/subs/users/hooks/use-get-user-service";
import { $userIDStore } from "@/modules/dashboard/subs/users/stores/users-id-store";

import { Separator } from "@/common/components/ui/separator";

import { useStore } from "@nanostores/react";

export default function UsersSheet() {
  const userID = useStore($userIDStore);
  const { data: user } = useGetUserService({ userID });
  const isDashboardSheetOpen = useStore($dashboardSheetStore);

  return (
    <DashboardSheet
      title="User Detail"
      description="Information about user in detail"
      open={isDashboardSheetOpen}
      onOpenChange={(open) => setDashboardSheetOpen(open)}
    >
      <Separator orientation="horizontal" />
      {user ? <></> : <UsersInfoSkeleton />}
    </DashboardSheet>
  );
}

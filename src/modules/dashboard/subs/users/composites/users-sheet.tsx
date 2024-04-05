import DashboardSheet from "@/modules/dashboard/composites/dashboard-sheet";
import {
  $dashboardSheetStore,
  setDashboardSheetOpen,
} from "@/modules/dashboard/stores/dashboard-sheet-store";
import useGetUserService from "@/modules/dashboard/subs/users/hooks/use-get-user-service";
import { $userIDStore } from "@/modules/dashboard/subs/users/stores/users-id-store";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";

import { useStore } from "@nanostores/react";

export default function UsersSheet() {
  const userID = useStore($userIDStore);
  const { data: user } = useGetUserService({ userID });
  const isDashboardSheetOpen = useStore($dashboardSheetStore);

  const profile = user ? user?.data?.included[0] : undefined;

  return (
    <DashboardSheet
      title="User Detail"
      description="Information about user in detail"
      open={isDashboardSheetOpen}
      onOpenChange={(open: boolean) => setDashboardSheetOpen(open)}
      hideHeader
    >
      <section className="mt-6 flex flex-col gap-6">
        <Avatar className="size-24 cursor-pointer self-center">
          <AvatarImage
            src={profile?.attributes?.image_url ?? ""}
            alt={profile?.attributes?.first_name}
          />
          <AvatarFallback className="bg-background text-3xl font-bold">
            {profile?.attributes?.first_name[0] ?? "?"}
          </AvatarFallback>
        </Avatar>
      </section>
    </DashboardSheet>
  );
}

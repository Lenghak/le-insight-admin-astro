import DashboardSheet from "@/modules/dashboard/composites/dashboard-sheet";
import {
  $dashboardSheetStore,
  setDashboardSheetOpen,
} from "@/modules/dashboard/stores/dashboard-sheet-store";
import useGetUserService from "@/modules/dashboard/subs/users/hooks/use-get-user-service";
import { $userIDStore } from "@/modules/dashboard/subs/users/stores/users-id-store";

import { ProfileSkeleton } from "@/common/components/custom/profile";
import ProfileBadge from "@/common/components/custom/profile/profile-badge";
import { Muted } from "@/common/components/ui/muted";
import { Separator } from "@/common/components/ui/separator";

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
      onOpenChange={(open) => setDashboardSheetOpen(open)}
    >
      <Separator orientation="horizontal" />

      <section className="mt-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 grid-rows-[auto]">
          <div className="flex flex-col">
            <span className="font-bold">Profile</span>
            <Muted>User's profile information</Muted>
          </div>

          <div className="flex flex-col gap-4">
            {user ? (
              <ProfileBadge
                avatarClassName="size-14"
                email={user?.data?.data?.attributes?.email}
                firstName={profile?.attributes.first_name}
                lastName={profile?.attributes.last_name}
                imageURL={profile?.attributes.image_url ?? ""}
              />
            ) : (
              <ProfileSkeleton />
            )}
          </div>
        </div>
      </section>
    </DashboardSheet>
  );
}

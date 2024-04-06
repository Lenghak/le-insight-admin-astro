import DashboardSheet from "@/modules/dashboard/composites/dashboard-sheet";
import {
  $dashboardSheetStore,
  setDashboardSheetOpen,
} from "@/modules/dashboard/stores/dashboard-sheet-store";
import useGetUserService from "@/modules/dashboard/subs/users/hooks/use-get-user-service";
import { $userIDStore } from "@/modules/dashboard/subs/users/stores/users-id-store";

import ProfileBadge from "@/common/components/custom/profile/profile-badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";

import { useStore } from "@nanostores/react";
import { MailIcon } from "lucide-react";

export default function UsersSheet() {
  const userID = useStore($userIDStore);
  const { data: res } = useGetUserService({ userID });
  const isDashboardSheetOpen = useStore($dashboardSheetStore);

  const user = res?.data?.data;
  const profile = res?.data?.included[0];

  return (
    <DashboardSheet
      title="User Detail"
      description="Information about user in detail"
      open={isDashboardSheetOpen}
      onOpenChange={(open: boolean) => setDashboardSheetOpen(open)}
      className="flex flex-col gap-8 sm:max-w-screen-xs"
      hideHeader
    >
      <ProfileBadge
        className="flex-col justify-center text-center"
        avatarClassName="size-24 text-3xl"
        email={user?.attributes.email}
        firstName={profile?.attributes.first_name}
        lastName={profile?.attributes.last_name}
        imageURL={profile?.attributes.image_url ?? ""}
      />

      <div className="flex items-center justify-center gap-4">
        <Alert className="border-none">
          <MailIcon className="h-4 w-4" />
          <AlertTitle>Email</AlertTitle>
          <AlertDescription>{user?.attributes.email}</AlertDescription>
        </Alert>
      </div>
    </DashboardSheet>
  );
}

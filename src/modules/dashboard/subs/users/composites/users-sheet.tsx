import { InlineBanner } from "@/common/components/custom/banner";
import ProfileBadge from "@/common/components/custom/profile/profile-badge";

import formatDate from "@/common/lib/date/format-date";

import DashboardSheet from "@dashboard/composites/dashboard-sheet";
import {
  $dashboardSheetStore,
  setDashboardSheetOpen,
} from "@dashboard/stores/dashboard-sheet-store";
import UsersSheetSection from "@dashboard/subs/users/components/users-sheet-section";
import { useStore } from "@nanostores/react";
import { RolesBages } from "@users/constants/role-bage";
import { SexesBages } from "@users/constants/sex-badge";
import useGetUserService from "@users/hooks/use-get-user-service";
import { $userIDStore } from "@users/stores/users-id-store";

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
      className="flex flex-col gap-4 divide-y overflow-y-auto rounded-l-xl border-none sm:max-w-screen-sm"
    >
      <UsersSheetSection
        title="Profile"
        description="Displayed user's profile badge"
        className="py-8"
      >
        <ProfileBadge
          email={user?.attributes.email}
          firstName={profile?.attributes.first_name}
          lastName={profile?.attributes.last_name}
          imageURL={profile?.attributes.image_url ?? ""}
        />
      </UsersSheetSection>

      <UsersSheetSection
        title="Identity"
        description="ID associated to the user"
        className="py-8"
      >
        <div className="flex flex-col gap-8">
          <InlineBanner
            title={"Identifier"}
            className="w-full font-medium"
          >
            {user?.id ?? "-"}
          </InlineBanner>

          <InlineBanner
            title={"Profile ID"}
            className="w-full font-medium"
          >
            {profile?.id ?? "-"}
          </InlineBanner>
        </div>
      </UsersSheetSection>

      <UsersSheetSection
        title="Personal Information"
        description="Detail info of the selected user"
        className="py-8"
      >
        <div className="flex flex-col gap-8">
          <InlineBanner
            title={"Full Name"}
            className="w-full font-medium"
          >
            {profile?.attributes.first_name} {profile?.attributes.last_name}
          </InlineBanner>

          <InlineBanner
            title={"Sex"}
            className="w-full font-medium"
          >
            {profile?.attributes.sex
              ? SexesBages[profile?.attributes.sex]
              : "-"}
          </InlineBanner>

          <InlineBanner
            title={"Email"}
            className="w-full font-medium"
          >
            {user?.attributes.email}
          </InlineBanner>

          <InlineBanner
            title={"Role"}
            className="w-full font-medium"
          >
            {user?.attributes.role ? (
              <div className="w-fit">{RolesBages[user?.attributes.role]}</div>
            ) : (
              "-"
            )}
          </InlineBanner>

          <InlineBanner
            title={"Phone"}
            className="w-full font-medium"
          >
            {user?.attributes.phone ?? "-"}
          </InlineBanner>

          <InlineBanner
            title={"Bio"}
            className="w-full font-medium"
          >
            {profile?.attributes.bio ?? "-"}
          </InlineBanner>
        </div>
      </UsersSheetSection>

      <UsersSheetSection
        title="Period"
        description="Date or time associated information"
        className="py-8"
      >
        <div className="flex flex-col gap-8">
          <InlineBanner
            title={"Joined at"}
            className="w-full font-medium"
          >
            {user?.attributes.created_at
              ? formatDate(user?.attributes.created_at)
              : "-"}
          </InlineBanner>

          <InlineBanner
            title={"User updated at"}
            className="w-full font-medium"
          >
            {user?.attributes.updated_at
              ? formatDate(user?.attributes.updated_at)
              : "-"}
          </InlineBanner>

          <InlineBanner
            title={"Confirmation sent at"}
            className="w-full font-medium"
          >
            {user?.attributes.confirmation_sent_at
              ? formatDate(user?.attributes.confirmation_sent_at)
              : "-"}
          </InlineBanner>

          <InlineBanner
            title={"Email confirmed at"}
            className="w-full font-medium"
          >
            {user?.attributes.confirmed_at
              ? formatDate(user?.attributes.confirmed_at)
              : "-"}
          </InlineBanner>

          <InlineBanner
            title={"Deleted at"}
            className="w-full font-medium"
          >
            {user?.attributes.deleted_at
              ? formatDate(user?.attributes.deleted_at)
              : "-"}
          </InlineBanner>

          <InlineBanner
            title={"Invited at"}
            className="w-full font-medium"
          >
            {user?.attributes.invited_at
              ? formatDate(user?.attributes.invited_at)
              : "-"}
          </InlineBanner>

          <InlineBanner
            title={"Profile created at"}
            className="w-full font-medium"
          >
            {profile?.attributes.created_at
              ? formatDate(profile?.attributes.created_at)
              : "-"}
          </InlineBanner>

          <InlineBanner
            title={"Profile created at"}
            className="w-full font-medium"
          >
            {profile?.attributes.updated_at
              ? formatDate(profile?.attributes.updated_at)
              : "-"}
          </InlineBanner>
        </div>
      </UsersSheetSection>
    </DashboardSheet>
  );
}

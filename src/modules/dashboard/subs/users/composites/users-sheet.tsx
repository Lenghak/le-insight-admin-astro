import SheetSection from "@/modules/dashboard/subs/users/components/sheet-section";

import { InlineBanner } from "@/common/components/custom/banner";
import InlineBannerContent from "@/common/components/custom/banner/inline-banner-content";
import InlineBannerTitle from "@/common/components/custom/banner/inline-banner-title";
import ProfileBadge from "@/common/components/custom/profile/profile-badge";

import formatDate from "@/common/lib/date/format-date";

import DashboardSheet from "@dashboard/composites/dashboard-sheet";
import {
  $dashboardSheetStore,
  setDashboardSheetOpen,
} from "@dashboard/stores/dashboard-sheet-store";
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
      <SheetSection
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
      </SheetSection>

      <SheetSection
        title="Identifiers"
        description="ID associated to the user"
        className="grid-cols-1 grid-rows-[auto,_1fr] py-8"
      >
        <div className="flex flex-col gap-8 pt-2">
          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Identifier
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.id ?? "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Profile
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {profile?.id ?? "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Location
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {profile?.attributes.location_id ?? "-"}
            </InlineBannerContent>
          </InlineBanner>
        </div>
      </SheetSection>

      <SheetSection
        title="Personal Information"
        description="Detail info of the selected user"
        className="grid-cols-1 grid-rows-[auto,_1fr] py-8"
      >
        <div className="flex flex-col gap-8 pt-2">
          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Full Name
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {profile?.attributes.first_name} {profile?.attributes.last_name}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Sex
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {profile?.attributes.sex
                ? SexesBages[profile?.attributes.sex]
                : "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Email
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.email}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Role
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.role ? (
                <div className="w-fit">{RolesBages[user?.attributes.role]}</div>
              ) : (
                "-"
              )}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Phone
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.phone ?? "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Bio
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {profile?.attributes.bio ?? "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Bithday
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {profile?.attributes.birthday
                ? formatDate(profile?.attributes.birthday)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>
        </div>
      </SheetSection>

      <SheetSection
        title="Period"
        description="Date or time associated information"
        className="grid-cols-1 grid-rows-[auto,_1fr] py-8"
      >
        <div className="flex flex-col gap-8 pt-2">
          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Joined at
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.created_at
                ? formatDate(user?.attributes.created_at)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>
          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Updated at ~ (User)
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.created_at
                ? formatDate(user?.attributes.created_at)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>
          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Confirmation sent at
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.confirmation_sent_at
                ? formatDate(user?.attributes.confirmation_sent_at)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>
          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Confirmed at
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.confirmed_at
                ? formatDate(user?.attributes.confirmed_at)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Deleted at
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.deleted_at
                ? formatDate(user?.attributes.deleted_at)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Invited at
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.invited_at
                ? formatDate(user?.attributes.invited_at)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Created at ~ (Profile)
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.created_at
                ? formatDate(user?.attributes.created_at)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Updated at ~ (Profile)
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {profile?.attributes.updated_at
                ? formatDate(profile?.attributes.updated_at)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Banned at
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.banned_at
                ? formatDate(user?.attributes.banned_at)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>

          <InlineBanner>
            <InlineBannerTitle className="list-item list-inside list-['\2012\2007'] font-semibold">
              Banned Until
            </InlineBannerTitle>
            <InlineBannerContent className="w-fit font-bold">
              {user?.attributes.banned_until
                ? formatDate(user?.attributes.banned_until)
                : "-"}
            </InlineBannerContent>
          </InlineBanner>
        </div>
      </SheetSection>
    </DashboardSheet>
  );
}

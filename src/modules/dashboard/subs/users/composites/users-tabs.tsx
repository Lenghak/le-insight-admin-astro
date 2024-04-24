import UserTabsSkeletons from "@users/components/users-tabs-skeleton";
import { lazy, memo, Suspense } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const DashboardTab = lazy(
  () => import("@dashboard/composites/tabs/dashboard-tab"),
);
const DashboardTabList = lazy(
  () => import("@dashboard/composites/tabs/dashboard-tab-list"),
);

type UsersTabsProps = Record<string, unknown>;

const TABS = ["all", "admin", "user"];

export default memo(function UsersTabs({}: UsersTabsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const role = searchParams.get("role");
  const activeTab = !!role ? role : "ALL";

  return (
    <Suspense fallback={<UserTabsSkeletons />}>
      <DashboardTabList className="h-fit w-fit rounded-full border bg-card p-0">
        {TABS.map((tab) => (
          <DashboardTab
            key={tab}
            pathname={pathname}
            link={false}
            onClick={() => {
              searchParams.set("role", tab.toUpperCase());
              setSearchParams(searchParams);
            }}
            activeFn={() => activeTab === tab.toUpperCase()}
            className="relative rounded-full px-6 text-sm capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {tab}
          </DashboardTab>
        ))}
      </DashboardTabList>
    </Suspense>
  );
});

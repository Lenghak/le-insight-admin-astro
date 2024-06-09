import DashboardTabsSkeletons from "@dashboard/composites/tabs/dashboard-tabs-skeleton";

import { lazy, memo, Suspense } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const DashboardTab = lazy(
  () => import("@dashboard/composites/tabs/dashboard-tab"),
);
const DashboardTabList = lazy(
  () => import("@dashboard/composites/tabs/dashboard-tab-list"),
);

const TABS = ["all", "active", "inactive", "pending", "revoked"];

export default memo(function SensitivitiesTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const status = searchParams.get("status");
  const activeTab = status ? status : "ALL";

  return (
    <Suspense fallback={<DashboardTabsSkeletons count={TABS.length} />}>
      <DashboardTabList className="h-fit w-fit rounded-full border bg-card p-0">
        {TABS.map((tab) => (
          <DashboardTab
            key={tab}
            pathname={pathname}
            link={false}
            onClick={() => {
              searchParams.set("status", tab.toUpperCase());
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

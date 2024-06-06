import DashboardTabsSkeletons from "@dashboard/composites/tabs/dashboard-tabs-skeleton";

import { lazy, memo, Suspense } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { ArticlesVisiblityEnum } from "@/common/types/articles-type";

const DashboardTab = lazy(
  () => import("@dashboard/composites/tabs/dashboard-tab"),
);
const DashboardTabList = lazy(
  () => import("@dashboard/composites/tabs/dashboard-tab-list"),
);

const TABS = ["ALL", ...ArticlesVisiblityEnum.options];

export default memo(function ArticlesTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const status = searchParams.get("status");
  const activeTab = status ? status : "ALL";

  return (
    <Suspense fallback={<DashboardTabsSkeletons count={1} />}>
      <DashboardTabList className="h-fit w-fit rounded-full border bg-card">
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
            {tab.toLowerCase()}
          </DashboardTab>
        ))}
      </DashboardTabList>
    </Suspense>
  );
});

import { $urlStore, setURLStore } from "@/common/stores/url-store";
import { useStore } from "@nanostores/react";
import { lazy, Suspense } from "react";

import UserTabsSkeletons from "./user-tabs-skeleton";

const DashboardTab = lazy(
  () => import("@dashboard/composites/tabs/dashboard-tab"),
);
const DashboardTabList = lazy(
  () => import("@dashboard/composites/tabs/dashboard-tab-list"),
);

type UsersTabsProps = Record<string, unknown>;

const TABS = ["all", "admin", "user"];

export default function UsersTabs({}: UsersTabsProps) {
  const url = useStore($urlStore);
  const role = url.searchParams.get("role");
  const activeTab = !!role ? role : "ALL";
  const pathname = url.pathname;

  return (
    <Suspense fallback={<UserTabsSkeletons />}>
      <DashboardTabList className="mt-4 w-fit border bg-card">
        {TABS.map((tab) => (
          <DashboardTab
            key={tab}
            pathname={pathname}
            link={false}
            onClick={() => {
              url.searchParams.set("role", tab.toUpperCase());
              setURLStore(url);
            }}
            activeFn={() => activeTab === tab.toUpperCase()}
            className="capitalize data-[state=active]:border"
          >
            {tab}
          </DashboardTab>
        ))}
      </DashboardTabList>
    </Suspense>
  );
}

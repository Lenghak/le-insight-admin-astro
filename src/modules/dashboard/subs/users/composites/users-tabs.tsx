import { $urlStore, setURLStore } from "@/common/stores/url-store";
import UserTabsSkeletons from "@dashboard/subs/users/components/users-tabs-skeleton";
import { useStore } from "@nanostores/react";
import { lazy, Suspense } from "react";

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
      <DashboardTabList className="h-fit w-fit rounded-full border bg-secondary p-0">
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
            className="rounded-full px-6 text-sm capitalize data-[state=active]:text-foreground"
          >
            {tab}
          </DashboardTab>
        ))}
      </DashboardTabList>
    </Suspense>
  );
}

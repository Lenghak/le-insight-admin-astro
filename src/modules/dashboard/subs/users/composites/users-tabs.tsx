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
      <DashboardTabList className="h-fit w-fit rounded-full border bg-card p-0">
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
            className="relative rounded-full px-6 text-sm capitalize before:invisible before:absolute before:bottom-0 before:h-1 before:w-2 before:self-end before:rounded-full before:bg-primary before:content-[''] data-[state=active]:text-foreground data-[state=active]:before:visible"
          >
            {tab}
          </DashboardTab>
        ))}
      </DashboardTabList>
    </Suspense>
  );
}

import {
  DashboardTab,
  DashboardTabList,
} from "@/modules/dashboard/composites/tabs";

type UsersTabsProps = {
  url: URL;
};

const TABS = ["all", "admin", "user"];

export default function UsersTabs({ url }: UsersTabsProps) {
  const activeTab = url.searchParams.get("role");
  const pathname = url.pathname;

  return (
    <DashboardTabList className="mt-4 w-fit border bg-card">
      {TABS.map((tab) => {
        return (
          <DashboardTab
            key={tab}
            pathname={pathname}
            link={true}
            href={(() => {
              url.searchParams.set("role", tab.toUpperCase());
              return url.toString();
            })()}
            activeFn={() =>
              activeTab === tab.toUpperCase() ||
              (activeTab === "all" && activeTab === undefined)
            }
            className="capitalize data-[state=active]:border"
          >
            {tab}
          </DashboardTab>
        );
      })}
    </DashboardTabList>
  );
}

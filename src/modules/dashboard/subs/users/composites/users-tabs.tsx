import {
  DashboardTab,
  DashboardTabList,
} from "@/modules/dashboard/composites/tabs";

type UsersTabsProps = {
  url: URL;
};

const TABS = ["all", "admin", "user"];

export default function UsersTabs({ url }: UsersTabsProps) {
  const activeTab = url.searchParams.get("tab") ?? "all";
  const pathname = url.pathname;

  return (
    <DashboardTabList className="mt-4 border bg-card">
      {TABS.map((tab) => {
        return (
          <DashboardTab
            key={tab}
            pathname={pathname}
            link={true}
            href={(() => {
              url.searchParams.set("tab", tab);
              return url.toString();
            })()}
            activeFn={() =>
              activeTab === tab ||
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

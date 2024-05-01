import DashboardTitle from "@dashboard/composites/dashboard-title";

import ArticlesCard from "@articles/composites/articles-card";

export default function ArticlesRoute() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <DashboardTitle
          title="Articles"
          spa
        />

        <div className="flex items-center justify-center gap-4">
          {/* <UsersCreateForm /> */}
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <ArticlesCard className="max-w-xl bg-transparent" />
      </div>
    </div>
  );
}

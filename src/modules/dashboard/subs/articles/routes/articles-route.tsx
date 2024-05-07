import DashboardTitle from "@dashboard/composites/dashboard-title";

import ArticlesCard from "@articles/composites/articles-card";
import ArticlesCreateForm from "@articles/composites/articles-create-form";

export default function ArticlesRoute() {
  return (
    <section className="space-y-6 p-6 pb-4 pr-4">
      <div className="flex items-end justify-between">
        <DashboardTitle
          title="Articles"
          spa
        />

        <div className="flex items-center justify-center gap-4">
          <ArticlesCreateForm />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <ArticlesCard className="max-w-xl bg-transparent" />
      </div>
    </section>
  );
}

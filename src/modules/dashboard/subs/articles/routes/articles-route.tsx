import DashboardTitle from "@dashboard/composites/dashboard-title";

import ArticlesEditorSheet from "@/modules/dashboard/subs/articles/composites/articles-editor-sheet";
import ArticlesCard from "@articles/composites/articles-card";

export default function ArticlesRoute() {
  return (
    <section className="space-y-6 p-6 pb-4 pr-4">
      <div className="flex items-end justify-between">
        <DashboardTitle
          title="Articles"
          spa
        />

        <div className="flex items-center justify-center gap-4">
          <ArticlesEditorSheet />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <ArticlesCard className="max-w-xl bg-transparent" />
      </div>
    </section>
  );
}

import DashboardTitle from "@dashboard/composites/dashboard-title";

import ArticlesEditorSheet from "@articles/composites/articles-editor-sheet";
import ArticlesList from "@articles/presenters/articles-list";

export default function ArticlesRoute() {
  return (
    <section className="flex h-full flex-col p-6 pb-4 pr-4">
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
        <ArticlesList />
      </div>
    </section>
  );
}

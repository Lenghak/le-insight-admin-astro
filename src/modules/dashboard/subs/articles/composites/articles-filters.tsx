import React from "react";

const DataTableSearch = React.lazy(
  () => import("@custom/table/data-table-search"),
);

const DateTableDatePicker = React.lazy(() =>
  import("@custom/table/data-table-date-range-picker").then((mod) => ({
    default: mod.DateTableDatePicker,
  })),
);

const ArticleCategoriesFilters = React.lazy(
  () => import("@articles/composites/articles-categories-filters"),
);

export default function ArticlesFilters() {
  return (
    <div className="flex w-fit items-center gap-4">
      <React.Suspense>
        <ArticleCategoriesFilters />

        {/* Search Query */}
        <DataTableSearch />

        {/* Date */}
        <DateTableDatePicker />
      </React.Suspense>
    </div>
  );
}

import useGetArticlesListService from "@/modules/dashboard/subs/articles/hooks/use-get-articles-service";

import ArticleDataList from "@articles/composites/articles-data-list";
import ArticlesFilters from "@articles/composites/articles-filters";
import ArticlesTabs from "@articles/composites/articles-tabs";

import { Fragment } from "react";

export default function ArticlesList() {
  // call the data
  const { data: res } = useGetArticlesListService({});
  // loop display them on the screens
  // - The filter and search
  // - The data
  // - The pagination should use infinite scroll
  console.log(res);

  return (
    <Fragment>
      <div className="mt-4 flex h-fit items-center justify-between gap-6">
        <ArticlesTabs />
        <ArticlesFilters />
      </div>

      <ArticleDataList articles={res?.data?.data} />
    </Fragment>
  );
}

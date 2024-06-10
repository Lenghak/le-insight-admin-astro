import ArticleDataList from "@articles/composites/articles-data-list";
import ArticlesFilters from "@articles/composites/articles-filters";
import ArticlesTabs from "@articles/composites/articles-tabs";
import useGetArticlesListService from "@articles/hooks/use-get-articles-service";

import React, { Fragment, Suspense } from "react";
import { useSearchParams } from "react-router-dom";

import type { ArticlesVisiblityEnumType } from "@/common/types/articles-type";

const ArticleArchivesForm = React.lazy(
  () => import("@articles/composites/articles-archives-form"),
);
const EditArticlesForm = React.lazy(
  () => import("@articles/composites/articles-edit-form"),
);

const CategoriesRegenForm = React.lazy(
  () => import("@articles/composites/articles-regen-categories-form"),
);

const SensitivitiesRegenForm = React.lazy(
  () => import("@articles/composites/articles-regen-sensitivities-form"),
);

type DateRange = string | Date | null | undefined;

export default function ArticlesList() {
  const [searchParams] = useSearchParams();

  const page = Number.parseInt(searchParams.get("page") ?? "1");
  const limit = Number.parseInt(searchParams.get("limit") ?? "50");
  const q = searchParams.get("q") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  let rfrom: DateRange = searchParams.get("from") ?? undefined;
  let rto: DateRange = searchParams.get("to") ?? undefined;

  try {
    rfrom = rfrom ? new Date(rfrom) : undefined;
    rto = rto ? new Date(rto) : undefined;
  } catch (_) {
    rfrom = undefined;
    rto = undefined;
  }

  const { data: res } = useGetArticlesListService({
    page,
    q,
    status:
      status === "ALL" ? undefined : (status as ArticlesVisiblityEnumType),
    limit,
    from: (rfrom as Date)?.toISOString(),
    to: (rto as Date)?.toISOString(),
    category,
  });

  return (
    <Fragment>
      <div className="mt-2 flex h-fit items-center justify-between gap-6 overflow-scroll py-2 scrollbar-hidden">
        <ArticlesTabs />
        <ArticlesFilters />
      </div>

      <ArticleDataList articles={res?.data?.data} />

      <Suspense>
        <ArticleArchivesForm />
        <EditArticlesForm />
        <CategoriesRegenForm />
        <SensitivitiesRegenForm />
      </Suspense>
    </Fragment>
  );
}

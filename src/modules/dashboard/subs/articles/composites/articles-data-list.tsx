import ErrorSection from "@/modules/error/components/error-section";

import ArticlesCard from "@articles/composites/articles-card";
import type { ArticlesListDataType } from "@articles/types/articles-list-type";

import { OrigamiIcon } from "lucide-react";

export default function ArticleDataList({
  articles,
}: {
  articles?: ArticlesListDataType[];
}) {
  return (
    <section className="grid-rows-auto grid h-full w-full grid-cols-1 gap-x-12 divide-y lg:grid-cols-2">
      {articles?.length && articles?.length > 0
        ? articles?.map((article, index) => (
          <ArticlesCard
            article={article}
            key={article?.id ?? index}
            className="w-full bg-card [&:nth-of-type(2)]:!border-t-0"
          />
        ))
        : undefined}

      {!articles?.length && (
        <ErrorSection
          img={
            <OrigamiIcon
              size={96}
              strokeWidth={2}
              className="mb-4"
            />
          }
          title="No article found!"
          className="col-span-full row-span-full h-[50vh]"
          description="There's no article right now. Stay tune or browse more keywords for better results."
        />
      )}
    </section>
  );
}


import ArticlesCard from "@/modules/dashboard/subs/articles/composites/articles-card";
import type { ArticlesListDataType } from "@articles/types/articles-list-type";

export default function ArticleDataList({ articles }: { articles?: ArticlesListDataType[] }) {
  console.log(articles)
  return (
    <section className="grid-rows-auto grid h-full w-full grid-cols-1 gap-x-12 divide-y lg:grid-cols-2">
      {articles?.map((article, index) => (
        <ArticlesCard
          article={article}
          key={article?.id ?? index}
          className="w-full rounded-none bg-transparent [&:nth-of-type(2)]:!border-t-0"
        />
      ))}
    </section>
  );
}

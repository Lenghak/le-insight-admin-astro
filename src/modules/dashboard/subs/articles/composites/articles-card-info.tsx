import { sentimentalBadge } from "@/modules/dashboard/subs/articles/constants/sentiment-badges";

import { Muted } from "@/common/components/ui/muted";
import { Separator } from "@/common/components/ui/separator";

import formatDate from "@/common/lib/date/format-date";
import { cn } from "@/common/lib/utils";

import ArticleInfoItem from "@articles/components/articles-info-item";
import { visibiltiesBadges } from "@articles/constants/visibilities-badges";
import type { ArticlesListDataType } from "@articles/types/articles-list-type";

import { Badge } from "@ui/badge";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  article: ArticlesListDataType;
};

export default function ArticleCardInfo({
  article,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "relative flex h-fit flex-col gap-6 space-y-0 px-8",
        className,
      )}
      {...props}
    >
      <Separator
        className="absolute left-3"
        orientation="vertical"
      />

      <ArticleInfoItem
        label={"Identifier"}
        className="col-span-full h-fit gap-2"
      >
        <span className="w-1/2 font-bold">{article?.id}</span>
      </ArticleInfoItem>

      <ArticleInfoItem label={"Status"}>
        <div className="w-1/2">
          <Badge
            className="font-bold capitalize"
            variant={"fair"}
            colored={visibiltiesBadges[article?.visibility].color}
          >
            {article?.visibility?.toLowerCase()}
          </Badge>
        </div>
      </ArticleInfoItem>

      <ArticleInfoItem
        label={"Sensitivity"}
        className="font-bold"
      >
        <div className="w-1/2 flex items-center flex-wrap gap-4">
          {article?.article_sensitivities.length > 0 ? (
            article?.article_sensitivities?.map(
              ({ article_id, sensitivity_id, sensitivity, sentiment }) => (
                <Badge
                  key={`${article_id}_${sensitivity_id}`}
                  variant={"fair"}
                  colored={sentimentalBadge[sentiment].color}
                  className="whitespace-nowrap font-bold"
                >
                  {sensitivity?.label}
                </Badge>
              ),
            )
          ) : (
            <Muted className="font-bold">-</Muted>
          )}
        </div>
      </ArticleInfoItem>

      <ArticleInfoItem label={"Created at"}>
        <span className="w-1/2 font-bold">
          {article?.created_at ? formatDate(article?.created_at) : "-"}
        </span>
      </ArticleInfoItem>

      <ArticleInfoItem label={"Updated at"}>
        <span className="w-1/2 font-bold">
          {article?.updated_at ? formatDate(article?.updated_at) : "-"}
        </span>
      </ArticleInfoItem>
    </div>
  );
}

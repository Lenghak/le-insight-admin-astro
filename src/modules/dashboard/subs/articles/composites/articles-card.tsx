import formatDate from "@/common/lib/date/format-date";
import { cn } from "@/common/lib/utils";

import ArticlesCardMoreDropdown from "@articles/composites/articles-card-more-dropdown";
import ArticleCategoryBadge from "@articles/composites/articles-categories-badge";
import type { ArticlesListDataType } from "@articles/types/articles-list-type";

import { Button, buttonVariants } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui/hover-card";
import { Muted } from "@ui/muted";

import { Image } from "@custom/image";
import ProfileBadge from "@custom/profile/profile-badge";
import ProfileHoverContent from "@custom/profile/profile-hover-content";

import {
  ArrowLeftRightIcon,
  ArrowRightLeftIcon,
  BookmarkIcon,
} from "lucide-react";
import React, { useState } from "react";

import ArticleCardInfo from "./articles-card-info";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  article: ArticlesListDataType;
};

export default React.forwardRef<HTMLDivElement, Props>(function ArticlesCard(
  { className, article, ...props },
  ref,
) {
  const author = article?.article_author;
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Card
      ref={ref}
      className={cn(
        buttonVariants({ variant: "secondary", size: "default" }),
        "relative grid h-auto w-full grid-cols-[1fr,auto] items-center justify-center gap-4 gap-x-8 whitespace-normal rounded-lg px-8 py-6",
        className,
      )}
      {...props}
    >
      <CardHeader className="col-span-2 flex h-full w-full flex-row items-center space-y-0 px-0 pb-0 pt-0">
        <div className="flex h-full w-full items-center justify-between gap-4 p-0">
          {/* Profile */}
          <HoverCard>
            <HoverCardTrigger>
              <ProfileBadge
                firstName={author?.profile?.first_name}
                lastName={author?.profile?.last_name}
                imageURL={author?.profile.image_url ?? ""}
                avatarClassName="size-8"
                avatarFallBackClassName="bg-accent"
                metaClassName="text-sm"
              />
            </HoverCardTrigger>
            <HoverCardContent className="ml-32 w-fit max-w-80 rounded-xl">
              <ProfileHoverContent userID={author?.id} />
            </HoverCardContent>
          </HoverCard>
        </div>

        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute right-0 top-4 size-9 rounded-r-none border-r-0 pl-1"
          onClick={() => setOpen(!isOpen)}
        >
          <ArrowLeftRightIcon
            className={cn("transition-all", isOpen ? "size-0" : "size-4")}
          />
          <ArrowRightLeftIcon
            className={cn("transition-all", !isOpen ? "size-0" : "size-4")}
          />
          <span className="sr-only">More Info</span>
        </Button>
      </CardHeader>

      <section className="relative grid w-full grid-cols-1 overflow-y-hidden overflow-x-visible py-2 transition-all">
        <div
          className={cn(
            "relative left-0 top-0 space-y-4 overflow-hidden transition-all duration-500",
            isOpen ? "absolute h-0 opacity-0" : "h-full",
          )}
        >
          <CardTitle className="line-clamp-2 text-xl font-black">
            {article?.preview_title}
          </CardTitle>

          <CardDescription className="line-clamp-2 font-serif text-base font-medium">
            {article?.preview_description}
          </CardDescription>

          <div className="flex w-full items-center justify-between gap-4 font-semibold">
            <Muted className="min-w-max py-1 text-xs uppercase tracking-widest">
              {article?.created_at ? formatDate(article?.created_at) : "-"}
            </Muted>
          </div>
        </div>

        <ArticleCardInfo
          article={article}
          className={cn(
            "relative left-0 top-0 w-full overflow-hidden transition-all duration-500",
            isOpen ? "h-full" : "absolute h-0 opacity-0",
          )}
        />
      </section>

      <CardContent
        className={cn(
          "flex aspect-square size-full min-h-40 max-w-40 items-center justify-center p-0 transition-all",
        )}
      >
        {/* Thumbnail */}
        <Image
          src={article?.thumbnail ?? ""}
          alt={article?.preview_title}
          className={
            "aspect-square h-full max-h-40 w-full max-w-40 rounded-xl object-cover"
          }
        />
      </CardContent>

      <CardFooter className="col-span-2 flex w-full items-center justify-between p-0">
        <div className="flex items-center justify-end gap-4">
          <div className="flex w-full items-center gap-8">
            <div className="flex w-full flex-nowrap items-center justify-start gap-4 overflow-hidden">
              {article?.article_categories?.map(({ category }) => (
                <ArticleCategoryBadge
                  key={category.id}
                  className="whitespace-nowrap px-3 py-1"
                >
                  {category.label}
                </ArticleCategoryBadge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          {/* Save */}
          <Button
            variant={"ghost"}
            size={"icon"}
            disabled
          >
            <span className="sr-only">Save the Article</span>
            <BookmarkIcon className="size-5" />
          </Button>

          {/* More */}
          <ArticlesCardMoreDropdown article={article} />
        </div>
      </CardFooter>
    </Card>
  );
});

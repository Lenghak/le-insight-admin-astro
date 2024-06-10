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

import { BookmarkIcon, ChevronsLeftIcon } from "lucide-react";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  article: ArticlesListDataType;
};

export default React.forwardRef<HTMLDivElement, Props>(function ArticlesCard(
  { className, article, ...props },
  ref,
) {
  const author = article?.article_author;

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
      {/* <Badge
        variant={"default"}
        colored={visibiltiesBadges[article?.visibility].color}
        className="hover:bg-current/50 absolute right-0 top-0 size-4 rounded-none rounded-bl-md rounded-tr-md p-0"
      /> */}

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
          className="absolute right-0 size-9 rounded-r-none border-r-0"
        >
          <ChevronsLeftIcon className="ml-1 size-4" />
          <span className="sr-only">More Info</span>
        </Button>
      </CardHeader>

      <div className="space-y-4">
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

      <CardContent className="flex aspect-square h-full min-h-40 w-auto max-w-40 items-center justify-center p-0">
        {/* Thumbnail */}
        <Image
          src={article?.thumbnail ?? ""}
          alt={article?.preview_title}
          className="aspect-square h-full max-h-40 w-full max-w-40 rounded-xl object-cover"
        />
      </CardContent>

      <CardFooter className="col-span-2 flex w-full items-center justify-between p-0">
        <div className="flex items-center justify-end gap-4">
          <div className="flex w-full items-center gap-8">
            <div className="flex w-full flex-nowrap items-center justify-start gap-4 overflow-hidden">
              {article?.article_categories?.map(({ category }) => (
                <ArticleCategoryBadge
                  key={category.id}
                  className="whitespace-nowrap px-3 py-1 shadow-inner"
                >
                  {/* <DotIcon className="mr-2 size-4" /> */}
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

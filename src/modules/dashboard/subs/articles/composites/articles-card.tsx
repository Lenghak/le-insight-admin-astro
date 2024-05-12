import type { ArticlesListDataType } from "@/modules/dashboard/subs/articles/types/articles-list-type";

import { Badge } from "@ui/badge";
import { Button, buttonVariants } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Muted } from "@ui/muted";
import { Small } from "@ui/small";

import { Image } from "@custom/image";
import { ProfileHoverCard } from "@custom/profile";
import ProfileBadge from "@custom/profile/profile-badge";

import formatDate from "@/common/lib/date/format-date";
import { cn } from "@/common/lib/utils";

import {
  BookmarkIcon,
  DotIcon,
  MessageCircle,
  MoreHorizontalIcon,
  ThumbsUpIcon,
} from "lucide-react";
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
        "grid h-auto w-full grid-cols-[1fr,auto] grid-rows-1 items-center justify-center gap-4 whitespace-normal rounded-lg border-0 px-8 py-6 shadow-none",
        className,
      )}
      {...props}
    >
      <CardHeader className="flex h-full w-full flex-col space-y-4 px-0 pb-0 pt-0">
        <div className="flex w-full items-center justify-between gap-4 p-0">
          {/* Profile */}
          <ProfileHoverCard asChild>
            <ProfileBadge
              firstName={author?.profile?.first_name}
              lastName={author?.profile?.last_name}
              imageURL={author?.profile.image_url ?? ""}
              avatarClassName="size-8"
              avatarFallBackClassName="bg-accent"
              metaClassName="text-sm"
            />
          </ProfileHoverCard>

          {/* Minutes Reads */}
          <Muted className="font-medium">5 minutes read</Muted>
        </div>

        <CardTitle className="line-clamp-2 text-xl font-black">
          {article?.preview_title}
        </CardTitle>

        <div className="flex w-full items-center gap-8">
          <Muted className="text-xs font-semibold uppercase tracking-widest">
            {article?.created_at ? formatDate(article?.created_at) : "-"}
          </Muted>

          <DotIcon size={16} />

          <Badge
            variant={"fair"}
            className="bg-accent text-xs font-bold"
          >
            Category
          </Badge>
        </div>

        <CardDescription className="line-clamp-2 font-serif text-base font-medium">
          {article?.preview_description}
        </CardDescription>
      </CardHeader>

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
          <div className="flex items-center">
            <Button
              variant={"ghost"}
              size={"icon"}
              disabled
            >
              <span className="sr-only">Like the Article</span>
              <ThumbsUpIcon className="size-5" />
            </Button>

            <Button
              variant={"ghost"}
              size={"icon"}
            >
              <Small>0</Small>
            </Button>
          </div>

          <div className="flex items-center">
            <Button
              variant={"ghost"}
              size={"icon"}
              disabled
            >
              <span className="sr-only">Comment on the Article</span>
              <MessageCircle className="size-5" />
            </Button>

            <Button
              variant={"ghost"}
              size={"icon"}
            >
              <Small>0</Small>
            </Button>
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
          <Button
            variant={"ghost"}
            size={"icon"}
          >
            <span className="sr-only">More Options</span>
            <MoreHorizontalIcon className="size-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
});

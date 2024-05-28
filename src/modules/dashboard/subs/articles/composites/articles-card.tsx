import ArticlesCardMoreDropdown from "@articles/composites/articles-card-more-dropdown";
import ArticleCategoryBadge from "@articles/composites/articles-categories-badge";
import type { ArticlesCategoriesListType } from "@articles/types/articles-list-type";

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

import formatDate from "@/common/lib/date/format-date";
import { cn } from "@/common/lib/utils";

import { BookmarkIcon, DotIcon } from "lucide-react";
import React, { useId } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	ac: ArticlesCategoriesListType;
};

export default React.forwardRef<HTMLDivElement, Props>(function ArticlesCard(
	{ className, ac, ...props },
	ref,
) {
	const author = ac?.article.article_author;

	return (
		<Card
			ref={ref}
			className={cn(
				buttonVariants({ variant: "secondary", size: "default" }),
				"grid h-auto w-full grid-cols-[1fr,auto] grid-rows-1 items-center justify-center gap-4 whitespace-normal rounded-lg border-0 px-8 py-6",
				className,
			)}
			{...props}
		>
			<CardHeader className="flex h-full w-full flex-col space-y-4 px-0 pb-0 pt-0 justify-between">
				<div className="flex w-full items-center justify-between gap-4 p-0">
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

					{/* Minutes Reads */}
					<Muted className="font-medium">{}</Muted>
				</div>

				<CardTitle className="line-clamp-2 text-xl font-black">
					{ac?.article.preview_title}
				</CardTitle>

				<CardDescription className="line-clamp-2 font-serif text-base font-medium">
					{ac?.article.preview_description}
				</CardDescription>
			</CardHeader>

			<CardContent className="flex aspect-square h-full min-h-40 w-auto max-w-40 items-center justify-center p-0">
				{/* Thumbnail */}
				<Image
					src={ac?.article.thumbnail ?? ""}
					alt={ac?.article.preview_title}
					className="aspect-square h-full max-h-40 w-full max-w-40 rounded-xl object-cover"
				/>
			</CardContent>

			<CardFooter className="col-span-2 flex w-full items-center justify-between p-0">
				<div className="flex items-center justify-end gap-4">
					{/* <div className="flex items-center">
						<Button variant={"ghost"} size={"icon"} disabled>
							<span className="sr-only">Like the Article</span>
							<ThumbsUpIcon className="size-5" />
						</Button>

						<Button variant={"ghost"} size={"icon"}>
							<Small>0</Small>
						</Button>
					</div>

					<div className="flex items-center">
						<Button variant={"ghost"} size={"icon"} disabled>
							<span className="sr-only">Comment on the Article</span>
							<MessageCircle className="size-5" />
						</Button>

						<Button variant={"ghost"} size={"icon"}>
							<Small>0</Small>
						</Button>
					</div> */}
					<div className="flex w-full items-center gap-8">
						<Muted className="text-xs font-semibold uppercase tracking-widest min-w-max">
							{ac?.article.created_at
								? formatDate(ac?.article.created_at)
								: "-"}
						</Muted>

						<DotIcon size={16} />

						<div className="flex flex-nowrap w-full overflow-hidden items-center justify-start gap-4">
							{ac?.article?.article_categories?.map(({ category }) => (
								<ArticleCategoryBadge category={category} key={useId()}>
									{category.label}
								</ArticleCategoryBadge>
							))}
						</div>
					</div>
				</div>

				<div className="flex items-center justify-end gap-2">
					{/* Save */}
					<Button variant={"ghost"} size={"icon"} disabled>
						<span className="sr-only">Save the Article</span>
						<BookmarkIcon className="size-5" />
					</Button>

					{/* More */}
					<ArticlesCardMoreDropdown article={ac.article} />
				</div>
			</CardFooter>
		</Card>
	);
});

import { Badge } from "@/common/components/ui/badge";
import { COLOR_VARIANTS } from "@/common/constants/color-constants";
import formatDate from "@/common/lib/date/format-date";
import { cn } from "@/common/lib/utils";
import ArticlesCardMoreDropdown from "@articles/composites/articles-card-more-dropdown";
import ArticleCategoryBadge from "@articles/composites/articles-categories-badge";
import { visibiltiesBadges } from "@articles/constants/visibilities-badges";
import type { ArticlesListDataType } from "@articles/types/articles-list-type";
import { Image } from "@custom/image";
import ProfileBadge from "@custom/profile/profile-badge";
import ProfileHoverContent from "@custom/profile/profile-hover-content";
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
import { BookmarkIcon } from "lucide-react";
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
				"relative grid h-auto w-full grid-cols-[1fr,auto] grid-rows-1 items-center justify-center gap-4 whitespace-normal rounded-lg border-0 px-8 py-6",
				COLOR_VARIANTS[visibiltiesBadges[article?.visibility].color ?? "amber"],
				"before:hidden text-inherit border-2 border-b-0 border-l-0",
				className,
			)}
			{...props}
		>
			<Badge
				variant={"default"}
				colored={visibiltiesBadges[article?.visibility].color}
				className="absolute top-0 right-0 p-0 size-4 rounded-none rounded-tr-md rounded-bl-md hover:bg-current/50"
			/>

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
				</div>

				<div className="space-y-2">
					<CardTitle className="line-clamp-2 text-xl font-black">
						{article?.preview_title}
					</CardTitle>

					<CardDescription className="line-clamp-2 font-serif text-base font-medium">
						{article?.preview_description}
					</CardDescription>
				</div>

				<div className="w-full gap-4 flex justify-between items-center font-semibold">
					<Muted className="min-w-max py-1 text-xs uppercase tracking-widest">
						{article?.created_at ? formatDate(article?.created_at) : "-"}
					</Muted>
					{/* Minutes Reads */}
					<Muted className="text-xs uppercase tracking-widest py-1">
						{/* {5} minutes read */}
					</Muted>
				</div>
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
						<div className="flex flex-nowrap w-full overflow-hidden items-center justify-start gap-4">
							{article?.article_categories?.map(({ category }) => (
								<ArticleCategoryBadge
									category={category}
									key={category.id}
									className="whitespace-nowrap"
								>
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
					<ArticlesCardMoreDropdown article={article} />
				</div>
			</CardFooter>
		</Card>
	);
});

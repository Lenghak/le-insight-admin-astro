import { cn } from "@/common/lib/utils";
import useGetCategoriesListService from "@categories/hooks/use-get-categories-list-service";
import { PopoverClose } from "@radix-ui/react-popover";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@ui/command";
import { Input } from "@ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Small } from "@ui/small";
import { useDebounce } from "@uidotdev/usehooks";
import { FilterXIcon, TagIcon } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function ArticleCategoriesFilters() {
	const [open, setOpen] = React.useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchCategory, setSearchCategory] = React.useState<
		string | undefined
	>(undefined);
	const debounce = useDebounce(searchCategory, 500);

	const currentCategory = searchParams.get("category");

	const { data: res } = useGetCategoriesListService({
		q: debounce ?? undefined,
	});

	const categories = res?.data?.data;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size={currentCategory ? "sm" : "icon"}
					className={cn(
						"bg-card",
						currentCategory ? "h-9 px-4 font-bold" : "size-9 min-h-9 min-w-9",
					)}
				>
					{currentCategory ? (
						<div className="flex items-center gap-2">
							<TagIcon className="size-4 min-h-4 min-w-4" />
							<Badge>{currentCategory}</Badge>
						</div>
					) : (
						<TagIcon className="size-4 min-h-4 min-w-4" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" side="bottom" align="center">
				<Command>
					<CommandInput asChild>
						<Input
							placeholder="Filter categories..."
							className="outline-0 focus-visible:ring-0 focus-visible:shadow-none focus-visible:outline-0 focus-visible:ring-offset-0 border-0"
							onChange={(e) => setSearchCategory(e.currentTarget.value)}
						/>
					</CommandInput>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{categories?.map((category) => (
								<CommandItem
									key={category.id}
									value={category.label}
									data-state={
										category.label === currentCategory ? "active" : "inactive"
									}
									onSelect={(value) => {
										setSearchParams(
											{ category: value, page: "1" },
											{ replace: true },
										);
										setOpen(false);
									}}
									className="data-[state=active]:font-extrabold"
								>
									<Small className="capitalize font-semibold text-primary leading-loose">
										{category.label}
									</Small>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
				<PopoverClose asChild>
					<Button
						variant={"outline"}
						className="flex items-center gap-4 pl-4 font-bold text-destructive rounded-none w-full rounded-b-sm bg-card border-0"
						onClick={() => {
							setSearchParams((prev) => {
								prev.delete("category");
								return prev;
							});
						}}
					>
						<FilterXIcon className="size-4 stroke-[3]" />
						<span>Clear Filter</span>
					</Button>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
}

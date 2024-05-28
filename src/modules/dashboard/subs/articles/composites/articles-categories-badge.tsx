import { Badge, type BadgeProps } from "@/common/components/ui/badge";
import { cn } from "@/common/lib/utils";
import type { CategoriesType } from "@/common/types/categories-type";

type Props = BadgeProps & {
	category: CategoriesType;
};

export default function ArticleCategoryBadge({
	category,
	className,
	children,
	...props
}: Props) {
	return (
		<Badge
			className={cn("capitalize font-bold text-xs bg-accent", className)}
			variant={"fair"}
			{...props}
		>
			{children}
		</Badge>
	);
}

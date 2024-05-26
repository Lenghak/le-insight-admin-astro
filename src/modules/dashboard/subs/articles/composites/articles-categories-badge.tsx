import { Badge, type BadgeProps } from "@/common/components/ui/badge";
import { cn } from "@/common/lib/utils";
import useGetCategoryService from "@categories/hooks/use-get-category-service";

type Props = BadgeProps & {
	categoryId: string;
};

export default function ArticleCategoryBadge({
	categoryId,
	className,
	children,
	...props
}: Props) {
	const { data: res } = useGetCategoryService({ categoryId });

	return (
		<Badge
			className={cn("capitalize font-bold text-xs bg-accent", className)}
			variant={"fair"}
			{...props}
		>
			{res?.data.data.attributes.label}
			{children}
		</Badge>
	);
}

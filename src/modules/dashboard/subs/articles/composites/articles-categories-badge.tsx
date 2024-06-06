import { cn } from "@/common/lib/utils";

import { Badge, type BadgeProps } from "@ui/badge";

type Props = BadgeProps;

export default function ArticleCategoryBadge({
  className,
  children,
  ...props
}: Props) {
  return (
    <Badge
      className={cn("bg-accent text-xs font-bold capitalize", className)}
      variant={"fair"}
      {...props}
    >
      {children}
    </Badge>
  );
}

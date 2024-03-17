import { H3 } from "@/common/components/ui/h3";
import { Muted } from "@/common/components/ui/muted";

import { cn } from "@/common/lib/utils";

type DashboardTitleProps = {
  title: string;
  description: string;
  className?: string;
};

export default function DashboardTitle({
  title,
  description,
  className,
}: DashboardTitleProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <H3 className="font-extrabold">{title}</H3>
      <Muted className="font-medium">{description}</Muted>
    </div>
  );
}

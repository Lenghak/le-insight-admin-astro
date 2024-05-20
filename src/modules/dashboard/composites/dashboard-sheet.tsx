import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/common/components/ui/sheet";

import { cn } from "@/common/lib/utils";

import type { DialogProps } from "@radix-ui/react-dialog";
import type React from "react";

type DashboardSheetProps = React.PropsWithChildren & {
	title: React.ReactNode;
	description: React.ReactNode;
	hideHeader?: boolean;
	className?: string;
} & DialogProps;

export default function DashboardSheet({
	children,
	title,
	description,
	hideHeader,
	className,
	...props
}: DashboardSheetProps) {
	return (
		<Sheet {...props}>
			<SheetContent className={cn("w-full rounded-l-xl bg-card", className)}>
				{!hideHeader ? (
					<SheetHeader className="space-y-0 rounded-xl bg-card">
						<SheetTitle className="font-extrabold">{title}</SheetTitle>
						<SheetDescription>{description}</SheetDescription>
					</SheetHeader>
				) : null}
				{children}
			</SheetContent>
		</Sheet>
	);
}

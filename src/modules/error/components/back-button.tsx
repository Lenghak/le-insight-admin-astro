import { buttonVariants } from "@/common/components/ui/button";

import { cn } from "@/common/lib/utils";

import { MoveLeftIcon } from "lucide-react";

type Props = {
	className?: string;
};

export function BackButton({ className }: Props) {
	return (
		<a
			href="/dashboard/users"
			target="_parent"
			className={cn(
				buttonVariants({ size: "lg", variant: "default" }),
				"items-center gap-3 rounded-full font-bold",
				className,
			)}
		>
			<MoveLeftIcon size={18} />
			<span>Go back</span>
		</a>
	);
}

import { cn } from "@/common/lib/utils";

import { type HTMLAttributes, type PropsWithChildren, forwardRef } from "react";

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>;

export default forwardRef<HTMLDivElement, Props>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"flex w-full items-center justify-between gap-6 font-medium",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

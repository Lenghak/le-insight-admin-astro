import { cn } from "@/common/lib/utils";

import { withRef } from "@udecode/cn";
import { PlateElement, useElement } from "@udecode/plate-common";
import { useToggleButton, useToggleButtonState } from "@udecode/plate-toggle";
import { ChevronDown } from "lucide-react";

export const ToggleElement = withRef<typeof PlateElement>(
	({ children, ...props }, ref) => {
		const element = useElement();
		const state = useToggleButtonState(element.id as string);
		const { open, buttonProps } = useToggleButton(state);

		return (
			<PlateElement ref={ref} asChild {...props}>
				<div className="relative pl-6">
					<span
						contentEditable={false}
						className="absolute -left-2.5 -top-0.5 flex cursor-pointer select-none items-center justify-center rounded-full p-1 transition-colors hover:bg-accent"
						{...buttonProps}
					>
						<ChevronDown
							className={cn("size-4 transition-all", open ? "-rotate-90" : "")}
						/>
					</span>
					{children}
				</div>
			</PlateElement>
		);
	},
);

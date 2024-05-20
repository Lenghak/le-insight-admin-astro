import { buttonVariants } from "@ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@ui/tooltip";

import { cn } from "@/common/lib/utils";

import type { LucideIcon } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

interface SideNavProps {
	isCollapsed: boolean;
	links: {
		isDisabled: boolean;
		title: string;
		label?: string;
		icon: LucideIcon;
		variant: "default" | "ghost" | "muted";
		link: string;
	}[];
	pathname: string;
}

export default memo(function SideNav({
	links,
	isCollapsed,
	pathname,
}: SideNavProps) {
	return (
		<div
			data-collapsed={isCollapsed}
			className="group flex flex-col gap-4 py-4 data-[collapsed=true]:py-4"
		>
			<TooltipProvider>
				<nav className="grid gap-3 px-4 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-4 aria-disabled:!text-muted-foreground max-md:justify-center">
					{links.map((link, index) => {
						link.variant = pathname === link.link ? "default" : "ghost";

						return isCollapsed ? (
							<Tooltip delayDuration={0} key={link.link}>
								<TooltipTrigger asChild>
									<Link
										to={link.link}
										aria-disabled={link.isDisabled}
										data-state={
											link.variant === "default" ? "active" : "inactive"
										}
										className={cn(
											buttonVariants({
												variant: link.variant,
												size: isCollapsed ? "icon" : "default",
											}),
											"group h-10 w-10 font-semibold aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-muted-foreground aria-disabled:hover:text-muted-foreground",
										)}
									>
										<link.icon
											className={cn(
												"size-4 group-data-[state=active]:stroke-[2.5]",
											)}
										/>
										<span className="sr-only">{link.title}</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent
									side="right"
									className="flex items-center gap-4 rounded-full font-semibold"
								>
									{link.title}
									{link.label && (
										<span className="ml-auto font-semibold text-muted-foreground">
											{link.label}
										</span>
									)}
								</TooltipContent>
							</Tooltip>
						) : (
							<Link
								to={link.link}
								aria-disabled={link.isDisabled}
								data-state={link.variant === "default" ? "active" : "inactive"}
								key={index}
								className={cn(
									buttonVariants({
										variant: link.variant,
										size: isCollapsed ? "icon" : "default",
									}),
									"group gap-4 px-4 font-semibold aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-muted-foreground aria-disabled:hover:text-muted-foreground data-[state=active]:font-bold max-md:h-10 max-md:w-10 md:justify-start md:px-4",
								)}
							>
								<link.icon
									className={cn(
										"min-size-5 h-4 min-w-4 group-data-[state=active]:stroke-[3]",
									)}
								/>
								<span className={"max-md:hidden"}>{link.title}</span>
							</Link>
						);
					})}
				</nav>
			</TooltipProvider>
		</div>
	);
});

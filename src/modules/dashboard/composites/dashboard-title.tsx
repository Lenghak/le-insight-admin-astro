import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb";
import { H3 } from "@/common/components/ui/h3";

import { cn } from "@/common/lib/utils";

import { SlashIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

type DashboardTitleProps = {
	className?: string;
	title: string;
	spa?: boolean;
};

export default function DashboardTitle({
	className,
	title,
	spa = false,
}: DashboardTitleProps) {
	const location = useLocation();
	const links = location.pathname.split("/").filter((link) => link !== "");

	const LinkComp = spa ? Link : BreadcrumbLink;

	return (
		<div className={cn("flex flex-col gap-1", className)}>
			<H3 className="font-extrabold">{title}</H3>
			<Breadcrumb>
				<BreadcrumbList className="font-medium">
					{links.length < 4 ? (
						links.map((link, index) => (
							<Fragment key={link}>
								<BreadcrumbItem>
									<LinkComp
										href={`/${
											index === 0
												? links[0]
												: index === links.length - 1
													? links.join("/")
													: links.slice(0, index - 1).join("/")
										}`}
										to={`/${
											index === 0
												? links[0]
												: index === links.length - 1
													? links.join("/")
													: links.slice(0, index - 1).join("/")
										}`}
										className={cn(
											"capitalize underline-offset-4 hover:underline",
											index === links.length - 1 && "font-bold text-foreground",
										)}
									>
										{link}
									</LinkComp>
								</BreadcrumbItem>
								{index !== links.length - 1 && (
									<BreadcrumbSeparator>
										<SlashIcon />
									</BreadcrumbSeparator>
								)}
							</Fragment>
						))
					) : (
						<Fragment>
							<BreadcrumbItem>
								<LinkComp
									href={`/${links[0]}`}
									to={`/${links[0]}`}
									className={cn("capitalize")}
								>
									{links[0]}
								</LinkComp>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<SlashIcon />
							</BreadcrumbSeparator>

							<BreadcrumbItem>
								<LinkComp
									href={links.slice(0, links.length - 3).join("/")}
									to={links.slice(0, links.length - 3).join("/")}
								>
									<BreadcrumbEllipsis />
								</LinkComp>
							</BreadcrumbItem>

							<BreadcrumbSeparator>
								<SlashIcon />
							</BreadcrumbSeparator>

							<LinkComp
								href={links.slice(0, links.length - 2).join("/")}
								to={links.slice(0, links.length - 2).join("/")}
								className={cn("capitalize underline-offset-4 hover:underline")}
							>
								{links[links.length - 2]}
							</LinkComp>

							<BreadcrumbSeparator>
								<SlashIcon />
							</BreadcrumbSeparator>

							<LinkComp
								href={links.slice(0, links.length - 1).join("/")}
								to={links.slice(0, links.length - 1).join("/")}
								className={cn("capitalize underline-offset-4 hover:underline")}
							>
								{links[links.length - 1]}
							</LinkComp>
						</Fragment>
					)}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}

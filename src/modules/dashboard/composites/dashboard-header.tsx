import { DashboardCommandMenu } from "@dashboard/composites/dashboard-command-menu";

import ProfileDropdown from "@custom/profile";
import ModeToggle, { SpaModeToggle } from "@custom/theme";

import { Button } from "@ui/button";
import { Separator } from "@ui/separator";

import { $sidebar, setCollapsed } from "@/common/stores/side-bar-store";

import { useStore } from "@nanostores/react";
import { MenuIcon } from "lucide-react";

interface DashboardHeaderProps {
	spa?: boolean;
}

export default function DashboardHeader({ spa }: DashboardHeaderProps) {
	const isCollapsed = useStore($sidebar);

	return (
		<header className="relative flex h-16 w-full flex-row items-center justify-center gap-4 bg-card px-2">
			<Separator className="h-1/2" orientation="vertical" />

			<Button
				variant="ghost"
				size="icon"
				aria-label="side bar toggle"
				onClick={() => setCollapsed(!isCollapsed)}
				className="min-h-10 min-w-10 overflow-hidden transition-all max-md:h-0 max-md:min-h-0 max-md:w-0 max-md:min-w-0"
			>
				<MenuIcon className="h-4 w-4" />
			</Button>

			{/* Search  */}
			<DashboardCommandMenu />

			{/* Profiles */}
			<div className="flex w-full items-center justify-end gap-4">
				{spa ? <SpaModeToggle /> : <ModeToggle />}
				<ProfileDropdown />
			</div>
		</header>
	);
}

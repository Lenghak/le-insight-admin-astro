import DashboardHeader from "@dashboard/composites/dashboard-header";

import SideBar from "@custom/side-bar/side-bar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout({
	children,
}: {
	children?: React.ReactNode;
}) {
	return (
		<main className="grid h-full w-screen grid-cols-[auto,_1fr] grid-rows-[auto,_1fr] bg-card p-2 pr-2 4xl:mx-auto 4xl:max-w-screen-4xl 4xl:overflow-hidden 4xl:rounded-xl 4xl:border 4xl:p-0">
			<SideBar className="w-full" />

			<DashboardHeader spa />

			<section className="flex h-full w-full flex-col overflow-x-auto rounded-xl bg-background shadow-inner">
				<Outlet />
				{children}
			</section>
		</main>
	);
}

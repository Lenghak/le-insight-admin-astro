import DashboardHeader from "@/modules/dashboard/composites/dashboard-header";

import SideBar from "@/common/components/custom/side-bar/side-bar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <main className="grid h-full w-screen grid-cols-[auto,_1fr] grid-rows-[auto,_1fr] bg-card p-2 pr-2">
      <SideBar className="w-full" />

      <DashboardHeader />

      <section className="flex h-full w-full flex-col overflow-x-auto rounded-xl bg-background p-6 pb-4 pr-4">
        <Outlet />
        {children}
      </section>
    </main>
  );
}

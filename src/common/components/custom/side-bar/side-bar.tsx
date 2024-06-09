import Logo from "@/common/components/custom/logo";
import { Separator } from "@/common/components/ui/separator";

import { cn } from "@/common/lib/utils";

import { $sidebar } from "@/common/stores/side-bar-store";
import { useStore } from "@nanostores/react";
import {
  ActivityIcon,
  AlertCircleIcon,
  BellDotIcon,
  BookIcon,
  FilesIcon,
  HandCoinsIcon,
  Layers3Icon,
  LeafyGreenIcon,
  PieChartIcon,
  ScrollIcon,
  SwatchBookIcon,
  UsersIcon
} from "lucide-react";
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

import SideNav from "./side-nav";

export default memo(function SideBar({ className }: { className?: string }) {
  const isCollapsed = useStore($sidebar);
  const loacation = useLocation();
  return (
    <aside
      className={cn(
        "relative row-span-full w-16 bg-card transition-all ease-in-out md:w-56",
        isCollapsed ? "md:w-16" : "",
        className,
      )}
    >
      <Link
        to={"/spa/dashboard"}
        replace
        className={cn(
          "flex h-16 items-center justify-center",
          isCollapsed ? "h-16 px-2" : "md:justify-between md:px-4",
        )}
      >
        <Logo spa />
      </Link>

      <Separator className="mx-auto w-4/5" />

      <SideNav
        pathname={loacation.pathname}
        isCollapsed={isCollapsed}
        links={[
          {
            isDisabled: true,
            title: "Dashboard",
            link: "/spa/dashboard",
            icon: PieChartIcon,
            variant: "default",
          },
          {
            isDisabled: false,
            title: "Users",
            icon: UsersIcon,
            link: "/spa/dashboard/users",
            variant: "ghost",
          },
          {
            isDisabled: false,
            title: "Articles",
            icon: ScrollIcon,
            link: "/spa/dashboard/articles",
            variant: "ghost",
          },
          {
            isDisabled: false,
            title: "Categories",
            icon: SwatchBookIcon,
            link: "/spa/dashboard/categories",
            variant: "ghost",
          },
          {
            isDisabled: false,
            title: "Activities",
            icon: LeafyGreenIcon,
            link: "/spa/dashboard/sensitivities",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Activities",
            icon: ActivityIcon,
            link: "/spa/dashboard/activities",
            variant: "ghost",
          },
        ]}
      />

      <Separator className="mx-auto w-4/5" />

      <SideNav
        pathname={location.pathname}
        isCollapsed={isCollapsed}
        links={[
          {
            isDisabled: true,
            title: "Reports",
            icon: FilesIcon,
            link: "/spa/dashboard/reports",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Notifications",
            icon: BellDotIcon,
            link: "/spa/dashboard/notifications",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Updates",
            icon: AlertCircleIcon,
            link: "/spa/dashboard/updates",
            variant: "ghost",
          },
        ]}
      />

      <Separator className="mx-auto w-4/5" />

      <SideNav
        pathname={location.pathname}
        isCollapsed={isCollapsed}
        links={[
          {
            isDisabled: true,
            title: "Infrastructures",
            icon: Layers3Icon,
            link: "/spa/dashboard/infra",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Documents",
            icon: BookIcon,
            link: "/spa/docs",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Partnerships",
            icon: HandCoinsIcon,
            link: "/spa/partners",
            variant: "ghost",
          },
        ]}
      />
    </aside>
  );
});

import Logo from "@/common/components/custom/logo";
import SidebarSkeleton from "@/common/components/custom/side-bar/side-bar-skeleton";
import { Separator } from "@/common/components/ui/separator";

import { cn } from "@/common/lib/utils";

import { $sidebar } from "@/common/stores/side-bar-store";
import { useStore } from "@nanostores/react";
import { useIsClient } from "@uidotdev/usehooks";
import {
  ActivityIcon,
  AlertCircleIcon,
  ArchiveIcon,
  BellDotIcon,
  BookIcon,
  FilesIcon,
  HandCoinsIcon,
  Layers3Icon,
  PieChartIcon,
  ScrollIcon,
  SwatchBookIcon,
  UsersIcon,
} from "lucide-react";

import SideNav from "./side-nav";

export default function SideBar({
  className,
  pathname,
}: {
  className?: string;
  pathname: string;
}) {
  const isCollapsed = useStore($sidebar);

  const isClient = useIsClient();

  if (!isClient) return <SidebarSkeleton />;

  return (
    <aside
      className={cn(
        "relative row-span-full w-16 bg-card transition-all ease-in-out md:w-56",
        isCollapsed ? "md:w-16" : "",
        className,
      )}
    >
      <a
        href={"/dashboard"}
        className={cn(
          "flex h-16 items-center justify-center",
          isCollapsed ? "h-16 px-2" : "md:justify-between md:px-4",
        )}
      >
        <Logo />
      </a>

      <Separator className="mx-auto w-4/5" />

      <SideNav
        pathname={pathname}
        isCollapsed={isCollapsed}
        links={[
          {
            isDisabled: true,
            title: "Dashboard",
            link: "/dashboard",
            icon: PieChartIcon,
            variant: "default",
          },
          {
            isDisabled: false,
            title: "Users",
            icon: UsersIcon,
            link: "/dashboard/users",
            variant: "ghost",
          },
          {
            isDisabled: false,
            title: "Articles",
            icon: ScrollIcon,
            link: "/dashboard/articles",
            variant: "ghost",
          },
          {
            isDisabled: false,
            title: "Categories",
            icon: SwatchBookIcon,
            link: "/dashboard/categories",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Activities",
            icon: ActivityIcon,
            link: "/dashboard/activities",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Archives",
            icon: ArchiveIcon,
            link: "/dashboard/archives",
            variant: "ghost",
          },
        ]}
      />

      <Separator className="mx-auto w-4/5" />

      <SideNav
        pathname={pathname}
        isCollapsed={isCollapsed}
        links={[
          {
            isDisabled: true,
            title: "Reports",
            icon: FilesIcon,
            link: "/dashboard/reports",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Notifications",
            icon: BellDotIcon,
            link: "/dashboard/notifications",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Updates",
            icon: AlertCircleIcon,
            link: "/dashboard/updates",
            variant: "ghost",
          },
        ]}
      />

      <Separator className="mx-auto w-4/5" />

      <SideNav
        pathname={pathname}
        isCollapsed={isCollapsed}
        links={[
          {
            isDisabled: true,
            title: "Infrastructures",
            icon: Layers3Icon,
            link: "/dashboard/infra",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Documents",
            icon: BookIcon,
            link: "/docs",
            variant: "ghost",
          },
          {
            isDisabled: true,
            title: "Partnerships",
            icon: HandCoinsIcon,
            link: "/partners",
            variant: "ghost",
          },
        ]}
      />
    </aside>
  );
}

import { buttonVariants } from "@/common/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/ui/tooltip";

import { cn } from "@/common/lib/utils";

import { type LucideIcon } from "lucide-react";

interface SideNavProps {
  isCollapsed: boolean;
  links: {
    isDisabled: boolean;
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "secondary" | "ghost" | "muted";
    link: string;
  }[];
  pathname: string;
}

export default function SideNav({
  links,
  isCollapsed,
  pathname,
}: SideNavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-4 data-[collapsed=true]:py-4"
    >
      <nav className="grid gap-3 px-4 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-4 aria-disabled:!text-muted-foreground max-md:justify-center">
        {links.map((link, index) => {
          link.variant = pathname === link.link ? "secondary" : "ghost";

          return isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <a
                    href={link.link}
                    aria-disabled={link.isDisabled}
                    data-state={
                      link.variant === "secondary" ? "active" : "inactive"
                    }
                    className={cn(
                      buttonVariants({
                        variant: link.variant,
                        size: isCollapsed ? "icon" : "default",
                      }),
                      "h-10 w-10 font-semibold hover:bg-background aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-muted-foreground aria-disabled:hover:text-muted-foreground data-[state=active]:bg-background",
                    )}
                  >
                    <link.icon className={cn("h-4 w-4")} />
                    <span className="sr-only">{link.title}</span>
                  </a>
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
            </TooltipProvider>
          ) : (
            <a
              href={link.link}
              aria-disabled={link.isDisabled}
              data-state={link.variant === "secondary" ? "active" : "inactive"}
              key={index}
              className={cn(
                buttonVariants({
                  variant: link.variant,
                  size: isCollapsed ? "icon" : "default",
                }),
                "gap-4 px-4 font-semibold hover:bg-background aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-muted-foreground aria-disabled:hover:text-muted-foreground data-[state=active]:bg-background data-[state=active]:font-bold max-md:h-10 max-md:w-10 md:justify-start md:px-4",
              )}
            >
              <link.icon className={cn("h-4 min-h-4 w-4 min-w-4")} />
              <span className={"max-md:hidden"}>{link.title}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

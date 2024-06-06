import { useTheme } from "@/modules/dashboard/providers/theme-provider";

import { cn } from "@/common/lib/utils";

import { Button, type ButtonProps } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";

import { MonitorIcon, MoonStarIcon, SunIcon } from "lucide-react";
import React from "react";

type Props = ButtonProps & {
  showLabel?: boolean;
};
export default React.forwardRef<HTMLButtonElement, Props>(
  function SpaModeToggle({ showLabel, ...props }, ref) {
    const { setTheme } = useTheme();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          ref={ref}
        >
          <Button
            variant="ghost"
            size="icon"
            {...props}
          >
            <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all duration-75 dark:-rotate-90 dark:scale-0" />
            <MoonStarIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-75 dark:rotate-0 dark:scale-100" />
            <span className={cn(showLabel ? "" : "sr-only")}>Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="font-semibold"
        >
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="gap-4 px-2"
          >
            <SunIcon className="h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="gap-4 px-2"
          >
            <MoonStarIcon className="h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="gap-4 px-2"
          >
            <MonitorIcon className="h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

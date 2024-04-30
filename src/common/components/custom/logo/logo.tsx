import { useTheme as useSpaTheme } from "@dashboard/providers/theme-provider";

import { cn } from "@/common/lib/utils";

import { useTheme } from "next-themes";
import { type HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLImageElement> {
  spa?: boolean;
}

export default function Logo({ className, spa, ...props }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const { resolvedTheme: spaTheme } = useSpaTheme();

  return (
    <img
      src={
        (spa ? spaTheme : resolvedTheme) === "dark"
          ? "/svg/logo-dark.svg"
          : "/svg/logo-light.svg"
      }
      alt="Logo"
      className={cn("h-10 min-h-10 w-10 min-w-10", className)}
      {...props}
    />
  );
}

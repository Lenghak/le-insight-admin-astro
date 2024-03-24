import ProfileDropdown from "@/common/components/custom/profile";
import ModeToggle from "@/common/components/custom/theme";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Separator } from "@/common/components/ui/separator";

import { $sidebar, setCollapsed } from "@/common/stores/side-bar-store";
import { useStore } from "@nanostores/react";
import { MenuIcon, SearchIcon } from "lucide-react";

export default function DashboardHeader() {
  const isCollapsed = useStore($sidebar);

  return (
    <header className="relative flex h-16 w-full flex-row items-center justify-center gap-4 bg-card px-2">
      <Separator className="h-1/2 w-[0.03rem]" />

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
      <div className="absolute flex w-full max-w-md items-center justify-center">
        <Input
          type="text"
          placeholder="Search Le-Insight"
          className="w-full rounded-full border-0 bg-background pl-12 placeholder:ml-12 placeholder:text-center"
        />

        <SearchIcon className="absolute left-4 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Profiles */}
      <div className="flex w-full items-center justify-end gap-4">
        <ModeToggle />
        <ProfileDropdown />
      </div>
    </header>
  );
}

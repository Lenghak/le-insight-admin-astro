import { setDashboardSheetOpen } from "@/modules/dashboard/stores/dashboard-sheet-store";
import { setUserID } from "@/modules/dashboard/subs/users/stores/users-id-store";

import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";

import { cn } from "@/common/lib/utils";

import type { Row } from "@tanstack/react-table";
import {
  BanIcon,
  MoreHorizontalIcon,
  PencilLineIcon,
  UsersIcon,
} from "lucide-react";

import type { UsersType } from "@/common/types/users-type";

export default function UsersActions<TData>({ row }: { row: Row<TData> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 text-xxs"
      >
        <DropdownMenuItem
          className="items-center gap-3 px-3 py-2 font-semibold"
          onClick={() => {
            setUserID((row.original as UsersType).id);
            setDashboardSheetOpen(true);
          }}
        >
          <UsersIcon className="h-4 min-h-4 w-4 min-w-4 stroke-[2.5]" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem className="items-center gap-3 px-3 py-2 font-semibold">
          <PencilLineIcon className="h-4 min-h-4 w-4 min-w-4 stroke-[2.5]" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn(
            "items-center gap-3 bg-destructive/15 px-3 py-2 font-bold text-destructive hover:bg-destructive/15",
          )}
        >
          <BanIcon className="h-4 min-h-4 w-4 min-w-4 stroke-[2.5]" />
          Ban
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

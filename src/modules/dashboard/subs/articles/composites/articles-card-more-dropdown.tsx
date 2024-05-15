import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import { setDashboardDialogOpen } from "@dashboard/stores/dashboard-action-dialog-store";

import type { ArticlesListDataType } from "@articles/types/articles-list-type";

import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";

import { cn } from "@/common/lib/utils";

import {
  ArchiveIcon,
  CopyIcon,
  EyeIcon,
  MoreHorizontalIcon
} from "lucide-react";
import { toast } from "sonner";

export default function ArticlesCardMoreDropdown({
  article,
}: {
  article: ArticlesListDataType;
}) {
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
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="items-center gap-3 px-3 py-2 font-semibold"
            onClick={async () => {
              await navigator.clipboard.writeText(article?.id).then((res) => {
                toast.success("ID successfully copied to clipboard", {
                  closeButton: true,
                });
                return res;
              });
            }}
          >
            <CopyIcon className="h-4 min-h-4 w-4 min-w-4 stroke-[2.5]" />
            Copy
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="items-center gap-3 px-3 py-2 font-semibold"
            onClick={() => {
              setDashboardDialogOpen({
                id: DASHBOARD_DIALOG_ID.articles.edit,
                isOpen: true,
                meta: article.id,
              });
            }}
          >
            <EyeIcon className="h-4 min-h-4 w-4 min-w-4 stroke-[2.5]" />
            Visibiltiy
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className={cn(
              "items-center gap-3 px-3 py-2 font-bold",
            )}
            onClick={() => {
              setDashboardDialogOpen({
                id: DASHBOARD_DIALOG_ID.articles.delete,
                isOpen: true,
                meta: article.id,
              });
            }}
          >
            <ArchiveIcon className="h-4 min-h-4 w-4 min-w-4 stroke-[2.5]" />
            Archive
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import { setDashboardDialogOpen } from "@dashboard/stores/dashboard-action-dialog-store";
import { setDashboardSheetOpen } from "@dashboard/stores/dashboard-sheet-store";

import { setUserID } from "@users/stores/users-id-store";

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

import type { Row } from "@tanstack/react-table";
import {
	BanIcon,
	CopyIcon,
	MoreHorizontalIcon,
	PencilLineIcon,
	UsersIcon,
} from "lucide-react";
import { toast } from "sonner";

import type { UsersType } from "@/common/types/users-type";

export default function UsersActions<TData>({ row }: { row: Row<TData> }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontalIcon className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48 text-xxs">
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="items-center gap-3 px-3 py-2 font-semibold"
						onClick={async () => {
							await navigator.clipboard
								.writeText((row.original as UsersType).id)
								.then((res) => {
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

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
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
					<DropdownMenuItem
						className="items-center gap-3 px-3 py-2 font-semibold"
						onClick={() => {
							setUserID((row.original as UsersType).id);
							setDashboardDialogOpen({
								id: DASHBOARD_DIALOG_ID.users.edit,
								isOpen: true,
							});
						}}
					>
						<PencilLineIcon className="h-4 min-h-4 w-4 min-w-4 stroke-[2.5]" />
						Edit
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem
						className={cn(
							"items-center gap-3 bg-destructive/15 px-3 py-2 font-bold text-destructive hover:bg-destructive/15",
						)}
						onClick={() => {
							setUserID((row.original as UsersType).id);
							setDashboardDialogOpen({
								id: DASHBOARD_DIALOG_ID.users.ban,
								isOpen: true,
							});
						}}
					>
						<BanIcon className="h-4 min-h-4 w-4 min-w-4 stroke-[2.5]" />
						Ban
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

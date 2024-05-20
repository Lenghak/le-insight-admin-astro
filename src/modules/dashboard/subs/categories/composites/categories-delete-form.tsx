import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
	$dashboardDialogStore,
	setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";

import useDeleteCategoryService from "@categories/hooks/use-delete-categories-service";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@ui/alert-dialog";
import { Button } from "@ui/button";
import { Form } from "@ui/form";

import { cn } from "@/common/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DeleteCategorySchema = z.object({
	id: z.string().uuid(),
});

export function DeleteCategoryForm() {
	const dialog = useStore($dashboardDialogStore);
	const { status: categoryStatus, mutate: deleteCategory } =
		useDeleteCategoryService();

	const form = useForm<z.infer<typeof DeleteCategorySchema>>({
		resolver: zodResolver(DeleteCategorySchema),
		defaultValues: {
			id: "",
		},
	});

	useEffect(() => {
		if (dialog.meta && typeof dialog.meta === "string") {
			form.setValue("id", dialog.meta);
		}
	}, [dialog.meta]);

	useEffect(() => {
		if (categoryStatus === "success") {
			form.reset();
			setDashboardDialogOpen({
				isOpen: false,
				id: DASHBOARD_DIALOG_ID.categories.delete,
			});
		}
	}, [categoryStatus]);

	return (
		<AlertDialog
			open={
				dialog.isOpen && dialog.id === DASHBOARD_DIALOG_ID.categories.delete
			}
			onOpenChange={(isOpen) => {
				setDashboardDialogOpen({
					isOpen: isOpen,
					id: DASHBOARD_DIALOG_ID.categories.delete,
				});
			}}
		>
			<AlertDialogContent className="bg-card">
				<AlertDialogHeader>
					<AlertDialogTitle className="font-extrabold">
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription className="font-medium">
						This action cannot be undone. This will permanently delete a
						category and remove its data from the servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="mt-4 gap-4 font-bold">
					<AlertDialogCancel className="px-8">Cancel</AlertDialogCancel>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(({ id }) => deleteCategory({ id }))}
							className="space-y-8"
						>
							<Button
								type={categoryStatus === "pending" ? "button" : "submit"}
								disabled={categoryStatus === "pending"}
								variant={"destructive"}
								className={cn(
									"gap-0 px-8 font-bold transition-all",
									categoryStatus === "pending" ? "gap-2 pl-6" : "",
								)}
							>
								<Loader2Icon
									className={cn(
										"h-4 w-0 animate-spin transition-all",
										categoryStatus === "pending" ? "w-4" : "",
									)}
								/>
								Delete
							</Button>
						</form>
					</Form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

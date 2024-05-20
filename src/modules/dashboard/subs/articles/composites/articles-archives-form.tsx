import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
	$dashboardDialogStore,
	setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";

import useArchiveArticleService from "@articles/hooks/use-archive-article-service";

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

const formSchema = z.object({
	id: z.string().uuid(),
});

export default function ArticleArchivesForm() {
	const dialogStore = useStore($dashboardDialogStore);
	const articleID =
		typeof dialogStore.meta === "string" ? dialogStore.meta : "";

	const { mutate: archiveArticle, status: archivingStatus } =
		useArchiveArticleService();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: articleID,
		},
	});

	useEffect(() => {
		if (archivingStatus === "success")
			setDashboardDialogOpen({
				...dialogStore,
				isOpen: false,
			});
	}, [archivingStatus, dialogStore]);

	return (
		<AlertDialog
			open={
				dialogStore.isOpen &&
				dialogStore.id === DASHBOARD_DIALOG_ID.articles.delete
			}
			onOpenChange={(open) =>
				setDashboardDialogOpen({
					...dialogStore,
					id: DASHBOARD_DIALOG_ID.articles.delete,
					isOpen: open,
				})
			}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="font-extrabold">
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription className="font-medium">
						This action will archive the articles, and prevent it from public
						view. A notification should be informed to the user.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="mr-2 px-6 font-bold">
						Cancel
					</AlertDialogCancel>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(({ id }) => archiveArticle({ id }))}
							className="space-y-8"
						>
							<Button
								type={archivingStatus === "pending" ? "button" : "submit"}
								disabled={archivingStatus === "pending"}
								className={cn(
									"gap-0 px-8 font-bold transition-all",
									archivingStatus === "pending" ? "gap-2 pl-6" : "",
								)}
								onClick={() => form.setValue("id", articleID)}
							>
								<Loader2Icon
									className={cn(
										"h-4 w-0 animate-spin transition-all",
										archivingStatus === "pending" ? "w-4" : "",
									)}
								/>
								Archive
							</Button>
						</form>
					</Form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

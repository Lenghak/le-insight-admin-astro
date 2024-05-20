import { visibiltiesBadges } from "@/modules/dashboard/subs/articles/constants/visibilities-badges";

import DashboardDialogFormSkeleton from "@dashboard/components/dashboard-dialog-form-skeleton";
import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import { setDashboardDialogOpen } from "@dashboard/stores/dashboard-action-dialog-store";

import useEditArticlesHandler from "@articles/hooks/use-edit-articles-handler";

import { Button, buttonVariants } from "@ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/select";

import { cn } from "@/common/lib/utils";

import { Loader2Icon } from "lucide-react";

export default function EditArticlesForm() {
	const {
		dialog,
		form,
		isGettingArticle,
		editArticleStatus,
		mutate: editArticle,
		article,
	} = useEditArticlesHandler();

	return (
		<Dialog
			open={dialog.isOpen && DASHBOARD_DIALOG_ID.articles.edit === dialog.id}
			onOpenChange={(isOpen) =>
				setDashboardDialogOpen({
					id: DASHBOARD_DIALOG_ID.articles.edit,
					isOpen: isOpen,
				})
			}
		>
			{!isGettingArticle ? (
				<DialogContent className="bg-card">
					<DialogHeader>
						<DialogTitle className="font-extrabold">
							Edit Visibility
						</DialogTitle>
						<DialogDescription>
							Make changes to the article visibility here. Click save when
							you're done.
						</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((values) => {
								editArticle({ id: article?.id ?? "", data: { ...values } });
							})}
							className="mt-4 w-full space-y-6"
						>
							<FormField
								control={form.control}
								name="visibility"
								render={({ field }) => (
									<FormItem className="flex items-center gap-4">
										<FormLabel className="mt-2 font-bold">Visibility</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="rounded-full pl-4">
													<SelectValue placeholder="Select a status of category to update" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(visibiltiesBadges).map(
													([key, element]) => (
														<SelectItem value={key} key={key} className="pl-12">
															{element}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter className="gap-2">
								<DialogClose
									type="reset"
									className={cn(
										buttonVariants({ variant: "outline", size: "default" }),
										"px-8 font-bold",
									)}
								>
									Cancel
								</DialogClose>
								<Button
									type={editArticleStatus === "pending" ? "button" : "submit"}
									className={cn(
										"gap-0 px-8 font-bold transition-all",
										editArticleStatus === "pending" ? "gap-2 pl-6" : "",
									)}
									disabled={editArticleStatus === "pending"}
								>
									<Loader2Icon
										className={cn(
											"h-4 w-0 animate-spin transition-all",
											editArticleStatus === "pending" ? "w-4" : "",
										)}
									/>
									Save changes
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			) : (
				<DashboardDialogFormSkeleton />
			)}
		</Dialog>
	);
}

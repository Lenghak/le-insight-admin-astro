import { cn } from "@/common/lib/utils";

import useRegenCategoriesService from "@/modules/dashboard/subs/categories/hooks/use-regen-categories-service";

import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { Loader2Icon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().uuid(),
});

export default function CategoriesRegenForm() {
  const dialogStore = useStore($dashboardDialogStore);
  const articleID =
    typeof dialogStore.meta === "string" ? dialogStore.meta : "";

  const { mutateAsync: regenerateCategories, status: regenerateStatus } =
    useRegenCategoriesService({ article_id: articleID });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: articleID,
    },
  });

  const abortController = useMemo(
    () => new AbortController(),
    [regenerateStatus],
  );

  useEffect(() => {
    if (regenerateStatus === "pending" || regenerateStatus === "success") {
      setDashboardDialogOpen({
        ...dialogStore,
        isOpen: false,
      });
    }
  }, [regenerateStatus]);

  return (
    <AlertDialog
      open={
        dialogStore.isOpen &&
        dialogStore.id === DASHBOARD_DIALOG_ID.categories.regenerate
      }
      onOpenChange={(open) =>
        setDashboardDialogOpen({
          ...dialogStore,
          id: DASHBOARD_DIALOG_ID.categories.regenerate,
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
            This action will change the article's categories. A notification
            should be informed to the author.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full justify-center">
          <AlertDialogCancel className="mr-2 px-6 font-bold">
            Cancel
          </AlertDialogCancel>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async () => {
                toast.info("Categories are generating in background", {
                  id: "REGEN_CATEGORY_" + articleID,
                  duration: 10 * 1000,
                  description:
                    "Processing new data. You may see the result very shortly.",
                  closeButton: true,
                  icon: <Loader2Icon className="size-4 animate-spin" />,
                  action: (
                    <Button
                      className="font-bold text-foreground"
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => abortController.abort()}
                    >
                      Cancel
                    </Button>
                  ),
                });
                await regenerateCategories({
                  signal: abortController.signal,
                });
              })}
              className="space-y-8"
            >
              <Button
                type={regenerateStatus === "pending" ? "button" : "submit"}
                disabled={regenerateStatus === "pending"}
                className={cn(
                  "gap-0 px-8 font-bold transition-all",
                  regenerateStatus === "pending" ? "gap-2 pl-6" : "",
                )}
                onClick={() => form.setValue("id", articleID)}
              >
                <Loader2Icon
                  className={cn(
                    "h-4 w-0 animate-spin transition-all",
                    regenerateStatus === "pending" ? "w-4" : "",
                  )}
                />
                Regenerate Categories
              </Button>
            </form>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

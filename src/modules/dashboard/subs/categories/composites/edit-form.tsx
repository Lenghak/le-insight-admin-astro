import DashboardDialogFormSkeleton from "@dashboard/components/dashboard-dialog-form-skeleton";
import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import { setDashboardDialogOpen } from "@dashboard/stores/dashboard-action-dialog-store";

import { categoryStatus } from "@categories/constants/category-status";
import useEditCategoriesHandler from "@categories/hooks/use-edit-categories-handler";

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
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Textarea } from "@ui/textarea";

import { cn } from "@/common/lib/utils";

import { Loader2Icon } from "lucide-react";

export default function EditCategoriesForm() {
  const {
    dialog,
    form,
    isGettingCategory,
    editCategoryStatus,
    mutate: editCategory,
    category,
  } = useEditCategoriesHandler();

  return (
    <Dialog
      open={dialog.isOpen && DASHBOARD_DIALOG_ID.categories.edit === dialog.id}
      onOpenChange={(isOpen) =>
        setDashboardDialogOpen({
          id: DASHBOARD_DIALOG_ID.categories.edit,
          isOpen: isOpen,
        })
      }
    >
      {!isGettingCategory ? (
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="font-extrabold">Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to the category info here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => {
                editCategory({ id: category?.id, ...values });
              })}
              className="mt-4 w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col items-start justify-center">
                    <FormLabel
                      className="whitespace-nowrap font-bold"
                      htmlFor="label-field"
                    >
                      Label
                    </FormLabel>

                    <FormControl>
                      <Input
                        id="label-field"
                        placeholder="e. g. Technology"
                        className="rounded-full bg-background px-5 font-semibold"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="ml-4 list-item font-semibold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select a status of category to update" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(categoryStatus).map(
                          ([key, element]) => (
                            <SelectItem
                              value={key}
                              key={key}
                            >
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start justify-center">
                    <FormLabel
                      className="whitespace-nowrap font-bold"
                      htmlFor="description-field"
                    >
                      Description
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        id="description-field"
                        placeholder="e.g. something that related to society"
                        className="rounded-xl bg-background px-5 font-semibold"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="ml-4 list-item font-semibold" />
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
                  type={editCategoryStatus === "pending" ? "button" : "submit"}
                  className={cn(
                    "gap-0 px-8 font-bold transition-all",
                    editCategoryStatus === "pending" ? "gap-2 pl-6" : "",
                  )}
                  disabled={editCategoryStatus === "pending"}
                >
                  <Loader2Icon
                    className={cn(
                      "h-4 w-0 animate-spin transition-all",
                      editCategoryStatus === "pending" ? "w-4" : "",
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

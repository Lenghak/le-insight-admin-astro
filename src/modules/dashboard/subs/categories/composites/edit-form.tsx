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
} from "@/common/components/ui/select";
import { Textarea } from "@/common/components/ui/textarea";

import { cn } from "@/common/lib/utils";

import { categoryStatus } from "@categories/constants/category-status";
import useEditCategoryService from "@categories/hooks/use-edit-categories-service";
import useGetCategoryService from "@categories/hooks/use-get-category-service";
import {
  CategoriesEditRequestSchema,
  type CategoryEditRequestType,
} from "@categories/types/categories-edit-type";
import DashboardDialogFormSkeleton from "@dashboard/components/dashboard-dialog-form-skeleton";
import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditCategoriesForm() {
  const dialog = useStore($dashboardDialogStore);

  const {
    data: res,
    isLoading: isGettingCategory,
    status: getCategoryStatus,
    isRefetching,
  } = useGetCategoryService({
    categoryID: typeof dialog.meta === "string" ? dialog.meta : undefined,
  });
  const { status: editCategoryStatus } = useEditCategoryService();

  const category = res?.data?.data;

  const form = useForm<CategoryEditRequestType>({
    resolver: zodResolver(CategoriesEditRequestSchema),
    defaultValues: {
      status: category?.attributes?.status ?? "INACTIVE",
      label: category?.attributes?.label ?? "",
      description: category?.attributes?.description ?? "",
    },
  });

  useEffect(() => {
    if (category && getCategoryStatus === "success" && !isRefetching) {
      form.setValue(
        "status",
        category?.attributes?.status ?? form.getValues("status"),
      );

      form.setValue(
        "label",
        category?.attributes?.label ?? form.getValues("label"),
      );

      form.setValue(
        "description",
        category?.attributes?.description ?? form.getValues("description"),
      );
    }
  }, [category, getCategoryStatus, isRefetching]);

  useEffect(() => {
    if (editCategoryStatus === "success") {
      form.reset();
      setDashboardDialogOpen({
        id: DASHBOARD_DIALOG_ID.categories.edit,
        isOpen: false,
      });
    }
  }, [editCategoryStatus]);

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
              onSubmit={form.handleSubmit((value) => {
                console.log(value);
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
                  type={status === "pending" ? "button" : "submit"}
                  className={cn(
                    "gap-0 px-8 font-bold transition-all",
                    status === "pending" ? "gap-2 pr-3" : "",
                  )}
                  disabled={status === "pending"}
                >
                  <Loader2Icon
                    className={cn(
                      "h-4 w-0 animate-spin transition-all",
                      status === "pending" ? "w-4" : "",
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

import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";

import useEditCategoryService from "@categories/hooks/use-edit-categories-service";
import useGetCategoryService from "@categories/hooks/use-get-category-service";
import {
  CategoriesEditRequestSchema,
  type CategoryEditRequestType,
} from "@categories/types/categories-edit-type";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function useEditCategoriesHandler() {
  const dialog = useStore($dashboardDialogStore);

  const {
    data: res,
    isLoading: isGettingCategory,
    status: getCategoryStatus,
    isRefetching,
    ...query
  } = useGetCategoryService({
    categoryID: typeof dialog.meta === "string" ? dialog.meta : undefined,
  });
  const { status: editCategoryStatus, ...mutation } = useEditCategoryService();

  const category = res?.data?.data;

  const form = useForm<CategoryEditRequestType>({
    resolver: zodResolver(CategoriesEditRequestSchema),
    defaultValues: {
      status: category?.attributes?.status ?? "INACTIVE",
      label: category?.attributes?.label ?? "",
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

  return {
    res,
    isGettingCategory,
    getCategoryStatus,
    isRefetching,
    dialog,
    category,
    editCategoryStatus,
    form,
    ...query,
    ...mutation,
  };
}

import useEditSensitivitiesService from "@/modules/dashboard/subs/sensitivities/hooks/use-edit-sensitivities-service";
import useGetSensitivitiesService from "@/modules/dashboard/subs/sensitivities/hooks/use-get-sensitivities-service";
import {
  SensitivitiesEditRequestSchema,
  type SensitivitiesEditRequestType,
} from "@/modules/dashboard/subs/sensitivities/types/sensitivities-edit-type";

import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function useEditSensitivitiesHandler() {
  const dialog = useStore($dashboardDialogStore);

  const {
    data: res,
    isLoading: isGettingSensitivities,
    status: getSensitivitiesStatus,
    isRefetching,
    ...query
  } = useGetSensitivitiesService({
    sensitivityId: typeof dialog.meta === "string" ? dialog.meta : undefined,
  });
  const { status: editSensitivitiesStatus, ...mutation } =
    useEditSensitivitiesService();

  const category = res?.data?.data;

  const form = useForm<SensitivitiesEditRequestType>({
    resolver: zodResolver(SensitivitiesEditRequestSchema),
    defaultValues: {
      status: category?.attributes?.status ?? "INACTIVE",
      label: category?.attributes?.label ?? "",
    },
  });

  useEffect(() => {
    if (category && getSensitivitiesStatus === "success" && !isRefetching) {
      form.setValue(
        "status",
        category?.attributes?.status ?? form.getValues("status"),
      );

      form.setValue(
        "label",
        category?.attributes?.label ?? form.getValues("label"),
      );
    }
  }, [category, getSensitivitiesStatus, isRefetching, form]);

  useEffect(() => {
    if (editSensitivitiesStatus === "success") {
      form.reset();
      setDashboardDialogOpen({
        id: DASHBOARD_DIALOG_ID.categories.edit,
        isOpen: false,
      });
    }
  }, [editSensitivitiesStatus, form]);

  return {
    res,
    isGettingSensitivities,
    getSensitivitiesStatus,
    isRefetching,
    dialog,
    category,
    editSensitivitiesStatus,
    form,
    ...query,
    ...mutation,
  };
}

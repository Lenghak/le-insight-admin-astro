import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";

import useEditArticlesService from "@articles/hooks/use-edit-articles-service";
import useGetArticleService from "@articles/hooks/use-get-article-service";
import {
  UpdateArticleSchema,
  type UpdateArticleRequestType,
} from "@articles/types/articles-edit-type";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function useEditArticlesHandler() {
  const dialog = useStore($dashboardDialogStore);

  const {
    data: res,
    isLoading: isGettingArticle,
    status: getArticleStatus,
    isRefetching,
    ...query
  } = useGetArticleService({
    articleID: typeof dialog.meta === "string" ? dialog.meta : undefined,
  });
  const { status: editArticleStatus, ...mutation } = useEditArticlesService();

  const article = res?.data?.data;

  const form = useForm<UpdateArticleRequestType>({
    resolver: zodResolver(UpdateArticleSchema),
    defaultValues: {
      visibility: article?.attributes?.visibility ?? "ARCHIVED",
    },
  });

  useEffect(() => {
    if (article && getArticleStatus === "success" && !isRefetching) {
      form.setValue(
        "visibility",
        article?.attributes?.visibility ?? form.getValues("visibility"),
      );
    }
  }, [article, getArticleStatus, isRefetching]);

  useEffect(() => {
    if (editArticleStatus === "success") {
      form.reset();
      setDashboardDialogOpen({
        id: DASHBOARD_DIALOG_ID.articles.edit,
        isOpen: false,
      });
    }
  }, [editArticleStatus]);

  return {
    res,
    isGettingArticle,
    getArticleStatus,
    isRefetching,
    dialog,
    article,
    editArticleStatus,
    form,
    ...query,
    ...mutation,
  };
}

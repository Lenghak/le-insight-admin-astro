import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";

import EditorSkeleton from "@editor/components/editor-skeleton";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@ui/alert-dialog";
import { Button } from "@ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@ui/sheet";

import { useStore } from "@nanostores/react";
import { PenLineIcon } from "lucide-react";
import React, { Fragment, Suspense, useEffect, useState } from "react";

const Editor = React.lazy(() => import("./articles-editor"));

export default function ArticlesEditorSheet() {
  const sheetState = useStore($dashboardDialogStore);
  const [alertState, setAlert] = useState({
    isAlertOpen: false,
    isAlertConfirm: false,
  });

  useEffect(() => {
    if (alertState.isAlertConfirm) {
      setDashboardDialogOpen({
        id: DASHBOARD_DIALOG_ID.articles.editor,
        isOpen: false,
      });

      setAlert({
        isAlertOpen: false,
        isAlertConfirm: false,
      });
    }
  }, [alertState]);

  return (
    <Fragment>
      <Sheet
        modal={false}
        open={
          sheetState.id === DASHBOARD_DIALOG_ID.articles.editor &&
          sheetState.isOpen
        }
        onOpenChange={(open) => {
          if (open || alertState.isAlertConfirm) {
            setDashboardDialogOpen({
              id: DASHBOARD_DIALOG_ID.articles.editor,
              isOpen: open,
            });
          }

          if (!open)
            setAlert({
              isAlertOpen: true,
              isAlertConfirm: false,
            });
        }}
      >
        <SheetTrigger asChild>
          <Button className="items-center gap-1 pl-6 pr-4">
            <PenLineIcon
              size={16}
              strokeWidth={3}
            />
            <span className="px-2 font-bold">Write</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          className="grid h-full items-center gap-0 rounded-none"
          side={"bottom"}
        >
          <Suspense fallback={<EditorSkeleton />}>
            <Editor />
          </Suspense>
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={alertState.isAlertOpen}
        onOpenChange={(value) =>
          setAlert((s) => ({ ...s, isAlertOpen: value }))
        }
      >
        <AlertDialogContent className="space-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">
              Are you absolutely sure, you want to exit?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-medium">
              Although the data is reserved in the local-storage, it could have
              been damage or lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() =>
                setAlert({ isAlertConfirm: false, isAlertOpen: false })
              }
              className="px-6 font-bold"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                setAlert({ isAlertConfirm: true, isAlertOpen: false })
              }
              className="px-6 font-bold"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}

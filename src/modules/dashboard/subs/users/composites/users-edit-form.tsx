import {
  $dashboardDialogID,
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@/modules/dashboard/stores/dashboard-action-dialog-store";

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

import { cn } from "@/common/lib/utils";

import { useStore } from "@nanostores/react";

export default function UsersEditForm() {
  const dialog = useStore($dashboardDialogStore);
  const dialogID = useStore($dashboardDialogID);

  return (
    <Dialog
      open={dialog.isOpen && dialogID === dialog.id}
      onOpenChange={(isOpen) =>
        setDashboardDialogOpen({
          id: dialog.id,
          isOpen: isOpen,
        })
      }
    >
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="font-extrabold">Edit User</DialogTitle>
          <DialogDescription>
            Make changes to the user info here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <DialogClose
            type="reset"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "font-bold",
            )}
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            className="font-bold"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

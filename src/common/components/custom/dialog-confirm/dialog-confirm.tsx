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

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Fragment, useState } from "react";

const DialogRoot = DialogPrimitive.Root;

export default function Dialog({
  children,
  ...props
}: DialogPrimitive.DialogProps) {
  const [dialogState, setDialogState] = useState({
    isDialogOpen: false || props.defaultOpen || props.open,
    isAlertOpen: false,
  });

  return (
    <Fragment>
      <DialogRoot
        open={dialogState.isDialogOpen}
        onOpenChange={(isOpen) =>
          setDialogState({ ...dialogState, isDialogOpen: isOpen })
        }
        {...props}
      >
        {children}
      </DialogRoot>

      <AlertDialog open={dialogState.isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}

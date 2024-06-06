import formatDate from "@/common/lib/date/format-date";
import { cn } from "@/common/lib/utils";

import useEditUserService from "@users/hooks/use-edit-user-service";
import useGetUserService from "@users/hooks/use-get-user-service";
import { $userIDStore } from "@users/stores/users-id-store";

import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";

import { Button, buttonVariants } from "@ui/button";
import { Calendar } from "@ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { addDays } from "date-fns";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const banUserSchema = z.object({
  bannedAt: z.date({ required_error: "The start of the ban is required" }),
  bannedUntil: z.date({ required_error: "State the end of the ban" }),
});

export default memo(function UsersBanForm() {
  const dialog = useStore($dashboardDialogStore);

  const userID = useStore($userIDStore);
  const { data: res } = useGetUserService({ userID });
  const { mutate: editUser, status } = useEditUserService();

  const user = res?.data?.data;

  const form = useForm({
    resolver: zodResolver(banUserSchema),
    defaultValues: {
      bannedAt: new Date(),
      bannedUntil: addDays(new Date(), 1),
    },
  });

  useEffect(() => {
    if (status === "success") {
      setDashboardDialogOpen({
        id: DASHBOARD_DIALOG_ID.users.ban,
        isOpen: false,
      });
    }
  }, [status]);

  return (
    <Dialog
      open={dialog.isOpen && DASHBOARD_DIALOG_ID.users.ban === dialog.id}
      onOpenChange={(isOpen) =>
        setDashboardDialogOpen({
          id: DASHBOARD_DIALOG_ID.users.ban,
          isOpen: isOpen,
        })
      }
    >
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="font-extrabold">Ban User</DialogTitle>
          <DialogDescription>
            Set the time for the ban duration. User will be banned after the
            save.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((value) =>
              editUser({
                id: user?.id,
                banned_at: value.bannedAt.toISOString(),
                banned_until: value.bannedUntil.toISOString(),
              }),
            )}
            className="mt-4 w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="bannedAt"
              render={({ field }) => (
                <FormItem className="flex items-center justify-end gap-4 space-y-0">
                  <FormLabel className="whitespace-nowrap text-end font-bold">
                    Ban From
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-3/4">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-semibold",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value)
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bannedUntil"
              render={({ field }) => (
                <FormItem className="flex items-center justify-end gap-4 space-y-0">
                  <FormLabel className="whitespace-nowrap text-end font-bold">
                    Ban Until
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-3/4">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-semibold",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value)
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < form.getValues("bannedAt")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                type={status === "pending" ? "button" : "submit"}
                className={cn(
                  "gap-0 px-8 font-bold transition-all",
                  status === "pending" ? "gap-2 pl-6" : "",
                )}
                disabled={status === "pending"}
                variant={"destructive"}
              >
                <Loader2Icon
                  className={cn(
                    "h-4 w-0 animate-spin transition-all",
                    status === "pending" ? "w-4" : "",
                  )}
                />
                Ban
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

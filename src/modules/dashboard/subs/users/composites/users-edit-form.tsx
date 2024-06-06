import { cn } from "@/common/lib/utils";

import { rolesFields } from "@users/constants/roles-fields";
import useEditUserService from "@users/hooks/use-edit-user-service";
import useGetUserService from "@users/hooks/use-get-user-service";
import { $userIDStore } from "@users/stores/users-id-store";

import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import {
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";

import { Button, buttonVariants } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
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
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { UserRoleSchema, UsersSchema } from "@/common/types/users-type";

export default function UsersEditForm() {
  const dialog = useStore($dashboardDialogStore);

  const userID = useStore($userIDStore);
  const { data: res } = useGetUserService({ userID });
  const { mutate: editUser, status } = useEditUserService();

  const user = res?.data?.data;

  const form = useForm({
    resolver: zodResolver(
      UsersSchema.pick({
        role: true,
      }),
    ),
    defaultValues: {
      role: UserRoleSchema.Values[user?.attributes.role ?? "GUEST"],
    },
  });

  useEffect(() => {
    if (status === "success") {
      setDashboardDialogOpen({
        id: DASHBOARD_DIALOG_ID.users.edit,
        isOpen: false,
      });
    }
  }, [status]);

  return (
    <Dialog
      open={dialog.isOpen && DASHBOARD_DIALOG_ID.users.edit === dialog.id}
      onOpenChange={(isOpen) =>
        setDashboardDialogOpen({
          id: DASHBOARD_DIALOG_ID.users.edit,
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((value) =>
              editUser({ id: userID ?? "", role: value.role }),
            )}
            className="mt-4 w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col space-y-0">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={user?.attributes.role ?? field.value}
                      className="flex flex-col space-y-1"
                    >
                      {rolesFields.map((role, i) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={i}
                        >
                          <FormControl>
                            <Card
                              className={cn(
                                "relative w-full overflow-hidden outline-none ring-0 before:invisible before:absolute before:left-0 before:top-0 before:block before:size-4 before:rounded-ee-full before:rounded-ss-lg before:bg-primary before:content-['']",
                                role.className,
                                "border-accent bg-transparent has-[:checked]:border-current has-[:checked]:before:visible",
                              )}
                            >
                              <RadioGroupItem
                                value={role.value}
                                id={role.label}
                                className="peer sr-only"
                              />
                              <FormLabel
                                className="w-full"
                                htmlFor={role.label}
                              >
                                <CardContent
                                  className="group flex w-full items-center rounded-lg bg-card p-2 px-4"
                                  data-state={
                                    role.value === form.getValues("role")
                                      ? "checked"
                                      : "unchecked"
                                  }
                                >
                                  <div className="rounded-full p-2">
                                    <role.icon className="size-5" />
                                  </div>
                                  <CardHeader className="p-2">
                                    <CardTitle className="text-sm font-bold capitalize">
                                      {role.label}
                                    </CardTitle>
                                    <CardDescription>
                                      {role.description}
                                    </CardDescription>
                                  </CardHeader>
                                </CardContent>
                              </FormLabel>
                            </Card>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
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
    </Dialog>
  );
}

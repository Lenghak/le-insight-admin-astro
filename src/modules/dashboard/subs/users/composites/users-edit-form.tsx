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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";

import { cn } from "@/common/lib/utils";

import {
  $dashboardDialogStore,
  setDashboardDialogOpen,
} from "@dashboard/stores/dashboard-action-dialog-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { RolesBages } from "@users/constants/role-bage";
import useEditUserService from "@users/hooks/use-edit-user-service";
import useGetUserService from "@users/hooks/use-get-user-service";
import { $userIDStore } from "@users/stores/users-id-store";
import { useForm } from "react-hook-form";

import { UserRoleSchema, UsersSchema } from "@/common/types/users-type";

export default function UsersEditForm() {
  const dialog = useStore($dashboardDialogStore);

  const userID = useStore($userIDStore);
  const { data: res } = useGetUserService({ userID });
  const { mutate: editUser } = useEditUserService();

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

  return (
    <Dialog
      open={dialog.isOpen && `USER_EDIT` === dialog.id}
      onOpenChange={(isOpen) =>
        setDashboardDialogOpen({
          id: `USER_EDIT`,
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
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-full capitalize">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(UserRoleSchema.Values).map((role, i) => (
                        <SelectItem
                          key={i}
                          value={role}
                          className="capitalize"
                        >
                          <div className="mb-1">{RolesBages[role]}</div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

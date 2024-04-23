import useSignUpService from "@/modules/auth/hooks/use-sign-up-service";

import { Button, buttonVariants } from "@ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";

import { cn } from "@/common/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { type Ref, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUpFormSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name"),
  lastName: z.string().trim().min(1, "Enter your last name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, {
    message: "Enter at least 8 characters password",
  }),
});

export default function UsersCreateForm() {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const closeRef: Ref<HTMLButtonElement> = useRef(null);

  const [isPasswordShowed, setShowPassword] = useState(false);

  const {
    mutate: signUp,
    isPending: isSigningUp,
    isSuccess: isSignedUpSuccess,
  } = useSignUpService();

  useEffect(() => {
    if (isSignedUpSuccess) {
      closeRef?.current?.click();
      form.reset();
    }
  }, [isSignedUpSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="items-center gap-1"
          size={"sm"}
        >
          <PlusIcon size={16} />
          <span className="px-2 font-bold">Add data</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-extrabold">Create new user</DialogTitle>
          <DialogDescription>
            Signing up a new user directly from admin.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => signUp(values))}
            className="mt-4 w-full space-y-6"
          >
            <div className="flex w-full items-start justify-between gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-bold"
                      htmlFor="firstname-field"
                    >
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="firstname-field"
                        placeholder="e. g. John"
                        className="rounded-full bg-background px-5 font-semibold"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="ml-4 list-item text-xs font-semibold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-bold"
                      htmlFor="lastname-field"
                    >
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="lastname-field"
                        placeholder="e.g. Doe"
                        className="rounded-full bg-background px-5 font-semibold"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="ml-4 list-item text-xs font-semibold" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-bold"
                    htmlFor="email-field"
                  >
                    Email
                  </FormLabel>
                  <FormControl className="space-y-0">
                    <Input
                      id="email-field"
                      placeholder="someone@example.com"
                      className="rounded-full bg-background px-5 font-semibold"
                      autoComplete="on"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="ml-4 list-item text-xs font-semibold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-bold"
                    htmlFor="password-field"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        id="password-field"
                        placeholder="Enter a password"
                        className="rounded-full bg-background px-5 pr-12 font-semibold"
                        type={isPasswordShowed ? "text" : "password"}
                        autoComplete="on"
                        {...field}
                      />
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        type="button"
                        className="absolute right-1 top-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!isPasswordShowed)}
                      >
                        {isPasswordShowed ? (
                          <EyeIcon size={18} />
                        ) : (
                          <EyeOffIcon size={18} />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="ml-4 list-item text-xs font-semibold" />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-8 gap-2">
              <DialogClose
                ref={closeRef}
                type="reset"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "px-8 font-bold",
                )}
              >
                Cancel
              </DialogClose>
              <Button
                type={isSigningUp ? "button" : "submit"}
                disabled={isSigningUp}
                className={cn(
                  "gap-0 px-8 font-bold transition-all",
                  isSigningUp && "gap-4",
                )}
              >
                <Loader2Icon
                  className={cn("size-0 animate-spin", isSigningUp && "size-4")}
                />
                <span>Create</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

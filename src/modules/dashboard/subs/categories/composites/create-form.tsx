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
import { Loader2Icon, PlusIcon } from "lucide-react";
import { type Ref, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateCategoriesSchema = z.object({
  label: z.string().min(1, "Enter a label").trim(),
  description: z.string().min(1, "Describe the category").trim(),
});

export default function CreateCategoriesForm() {
  const form = useForm<z.infer<typeof CreateCategoriesSchema>>({
    resolver: zodResolver(CreateCategoriesSchema),
    defaultValues: {
      description: "",
      label: "",
    },
  });

  const closeRef: Ref<HTMLButtonElement> = useRef(null);

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
            onSubmit={form.handleSubmit((values) => console.log(values))}
            className="mt-4 w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="flex items-center justify-end gap-4">
                  <FormLabel
                    className="whitespace-nowrap text-end font-bold"
                    htmlFor="label-field"
                  >
                    First Name
                  </FormLabel>
                  <FormControl className="w-3/4">
                    <Input
                      id="label-field"
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
              name="description"
              render={({ field }) => (
                <FormItem className="flex items-center justify-end gap-4">
                  <FormLabel
                    className="whitespace-nowrap text-end font-bold"
                    htmlFor="description-field"
                  >
                    Last Name
                  </FormLabel>
                  <FormControl className="w-3/4">
                    <Input
                      id="description-field"
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
                type={true ? "button" : "submit"}
                disabled={true}
                className={cn(
                  "gap-0 px-8 font-bold transition-all",
                  true && "gap-4",
                )}
              >
                <Loader2Icon
                  className={cn("size-0 animate-spin", true && "size-4")}
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

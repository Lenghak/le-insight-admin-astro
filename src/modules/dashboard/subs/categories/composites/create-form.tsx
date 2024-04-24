import useCreateCategoryService from "@/modules/dashboard/subs/categories/hooks/use-create-categories-service";

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
import { Textarea } from "@/common/components/ui/textarea";

import { cn } from "@/common/lib/utils";

import { CategoriesCreateSchema } from "@categories/types/categories-ind-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { type Ref, useRef } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

export default function CreateCategoriesForm() {
  const form = useForm<z.infer<typeof CategoriesCreateSchema>>({
    resolver: zodResolver(CategoriesCreateSchema),
    defaultValues: {
      description: "",
      label: "",
    },
  });

  const { mutate: create, isPending: isCreatingCategory } =
    useCreateCategoryService();

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
          <DialogTitle className="font-extrabold">
            Create a new category
          </DialogTitle>
          <DialogDescription>
            Add new categories for grouping and managing articles.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => create(values))}
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
                    Label
                  </FormLabel>
                  <FormControl className="w-3/4">
                    <Input
                      id="label-field"
                      placeholder="e. g. Technology"
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
                <FormItem className="flex items-start justify-end gap-4">
                  <FormLabel
                    className="whitespace-nowrap text-end font-bold mt-4"
                    htmlFor="description-field"
                  >
                    Description
                  </FormLabel>
                  <FormControl className="w-3/4">
                    <Textarea
                      id="description-field"
                      placeholder="e.g. something that related to society"
                      className="rounded-xl bg-background px-5 font-semibold"
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
                type={isCreatingCategory ? "button" : "submit"}
                disabled={isCreatingCategory}
                className={cn(
                  "gap-0 px-8 font-bold transition-all",
                  isCreatingCategory && "gap-4 pl-6",
                )}
              >
                <Loader2Icon
                  className={cn(
                    "size-0 animate-spin",
                    isCreatingCategory && "size-4",
                  )}
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

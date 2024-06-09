import useCreateSensitivitiesService from "@/modules/dashboard/subs/sensitivities/hooks/use-create-sensitivities-service";

import { cn } from "@/common/lib/utils";


import { SensitivitiesCreateRequestSchema } from "@sensitivities/types/sensitivities-create-type";

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
} from "@ui/form";
import { Input } from "@ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useEffect, useRef, type Ref } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export default function SensitivitiesCreateForm() {
  const form = useForm<z.infer<typeof SensitivitiesCreateRequestSchema>>({
    resolver: zodResolver(SensitivitiesCreateRequestSchema),
    defaultValues: {
      label: "",
    },
  });

  const {
    mutate: create,
    isPending: isCreatingSensitivities,
    isSuccess: isSensitivitiesCreated,
  } = useCreateSensitivitiesService();

  const closeRef: Ref<HTMLButtonElement> = useRef(null);

  useEffect(() => {
    if (isSensitivitiesCreated) {
      closeRef.current?.click();
    }
  }, [isSensitivitiesCreated]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="items-center gap-1 px-4">
          <PlusIcon
            size={16}
            strokeWidth={3}
          />
          <span className="px-2 font-bold">Add data</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-extrabold">
            Create a new sensitivity
          </DialogTitle>
          <DialogDescription>
            Add new sensitivities for filtering and grouping articles.
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
                <FormItem className="flex w-full items-start justify-end gap-4">
                  <FormLabel
                    className="mt-5 whitespace-nowrap text-end font-bold"
                    htmlFor="label-field"
                  >
                    Label
                  </FormLabel>

                  <div className="w-3/4 space-y-2">
                    <FormControl>
                      <Input
                        id="label-field"
                        placeholder="e. g. Positive"
                        className="rounded-full bg-background px-5 font-semibold"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="ml-4 list-item font-semibold" />
                  </div>
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
                type={isCreatingSensitivities ? "button" : "submit"}
                disabled={isCreatingSensitivities}
                className={cn(
                  "gap-0 px-8 font-bold transition-all",
                  isCreatingSensitivities && "gap-4 pl-6",
                )}
              >
                <Loader2Icon
                  className={cn(
                    "size-0 animate-spin",
                    isCreatingSensitivities && "size-4",
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

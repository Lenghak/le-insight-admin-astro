import FileUploadForm from "@dashboard/components/file-upload-form";

import { Alert, AlertTitle } from "@ui/alert";
import { Button } from "@ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Separator } from "@ui/separator";
import { Textarea } from "@ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";

import { zodResolver } from "@hookform/resolvers/zod";
import { AsteriskIcon, CircleHelpIcon } from "lucide-react";
import type React from "react";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ArticlesThumbnailFormProps = {
  trigger?: React.ReactNode;
};

const formSchema = z.object({
  title: z
    .string()
    .min(8, "Title must be at least 8 characters")
    .max(1000, "Title must be less than 1024 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(2048, "Description must be less than 2048 characters"),
  thumbnail: z.string({ required_error: "Thumbnail cannot be empty" }).url(),
});

export default memo(function ArticlesThumbnailForm({
  trigger,
}: ArticlesThumbnailFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    if (form.getFieldState("thumbnail").error) {
      toast.error(form.getFieldState("thumbnail").error?.message, {
        closeButton: true,
      });
    }
  }, [form.getFieldState("thumbnail").error]);

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="h-5/6 w-full bg-card px-32 pb-12">
        <section className="mt-12 flex h-full w-full flex-col items-center justify-center gap-12 sm:flex-row">
          <div className="flex h-full w-full flex-col gap-4">
            <FileUploadForm
              formFieldKey={formSchema.keyof().Enum.thumbnail}
              outerForm={form}
              className="h-full [&>div]:max-h-none [&>div]:bg-background [&>div]:font-serif"
            />

            <Alert className="items-center border-none bg-transparent pr-8">
              <AsteriskIcon className="mt-0.5 size-3" />
              <AlertTitle className="font-serif text-sm italic">
                You can upload one file only per thumbnail with 5MB size
                limited.{" "}
                <Button
                  variant={"link"}
                  className="size-fit p-0 px-1 italic"
                >
                  Learn more
                </Button>
              </AlertTitle>
            </Alert>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full w-2/3 space-y-8 font-serif"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Preview Title</FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-h-12 rounded-xl bg-background px-6 py-4 font-semibold"
                        placeholder="Enter preview title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-semibold italic" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Preview Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-h-12 rounded-xl bg-background px-6 py-4 font-semibold"
                        placeholder="Enter preview description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-semibold italic" />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="font-bold">Category</FormLabel>
                <Separator />
                <FormDescription>
                  Our system will pick a category for you based on your content.
                  Once you sumbit, you will see the category badge attachd to
                  your articles.
                </FormDescription>
              </FormItem>

              <div className="flex w-full items-center justify-between">
                <Button
                  type="submit"
                  className="px-6 font-sans font-bold"
                >
                  Submit
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        type="button"
                      >
                        <CircleHelpIcon className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-64">
                      <Alert className="items-center border-none bg-transparent p-2">
                        <AlertTitle className="font-medium leading-5">
                          The title and description will be shown in the preview
                          card.
                        </AlertTitle>
                      </Alert>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </form>
          </Form>
        </section>
      </DrawerContent>
    </Drawer>
  );
});

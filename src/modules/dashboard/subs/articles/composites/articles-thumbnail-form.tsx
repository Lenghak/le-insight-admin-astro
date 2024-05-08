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
import { Input } from "@ui/input";
import { Separator } from "@ui/separator";
import { Textarea } from "@ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";

import { zodResolver } from "@hookform/resolvers/zod";
import type { PlateCloudEditor } from "@udecode/plate-cloud";
import { useEditorRef, type PlateEditor } from "@udecode/plate-common";
import { AsteriskIcon, CircleHelpIcon } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ArticlesThumbnailFormProps = {
  editor?: PlateEditor | PlateCloudEditor;
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
});

export default function ArticlesThumbnailForm({
  trigger,
}: ArticlesThumbnailFormProps) {
  const editor = useEditorRef();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title:
        (editor.children.find((v) => v.type === "h1")?.children[0]
          .text as string) ?? "",
      description:
        (editor.children.find((v) => v.type === "p")?.children[0]
          .text as string) ?? "",
    },
  });

  const onSubmit = useCallback(
    () => (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
    },
    [],
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="h-5/6 w-full bg-card px-32 pb-12">
        <section className="mt-12 flex h-full w-full flex-col items-center justify-center gap-12 sm:flex-row">
          <div className="flex h-full w-full flex-col gap-4">
            <FileUploadForm className="h-full [&>div]:max-h-none [&>div]:bg-background [&>div]:p-12" />

            <Alert className="items-center border-none bg-transparent pr-8">
              <AsteriskIcon className="mt-0.5 size-3" />
              <AlertTitle className="font-mono text-sm font-medium italic">
                You can upload one file only per thumbnail with 5MB size
                limited.{" "}
                <Button
                  variant={"link"}
                  className="size-fit p-0 px-1 text-xs font-bold italic"
                >
                  Learn more
                </Button>
              </AlertTitle>
            </Alert>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full w-2/3 space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="font-mono">
                    <FormLabel className="font-bold">Preview Title</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl bg-background px-6 font-semibold"
                        placeholder="Enter preview title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-semibold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="font-mono">
                    <FormLabel className="font-bold">
                      Preview Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-h-5 rounded-xl bg-background px-6 py-4 font-semibold"
                        placeholder="Enter preview description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-semibold" />
                  </FormItem>
                )}
              />

              <FormItem className="font-mono">
                <FormLabel className="font-bold">Category</FormLabel>
                <Separator />
                <FormDescription className="font-mono">
                  Our system will pick a category for you based on your content.
                  Once you sumbit, you will see the category badge attachd to
                  your articles.
                </FormDescription>
              </FormItem>

              <div className="flex w-full items-center justify-between">
                <Button
                  type="submit"
                  className="px-6 font-bold"
                >
                  Submit
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
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
                        <AlertTitle className="font-mono text-xs font-bold">
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
}

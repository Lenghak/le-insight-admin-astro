import { cn } from "@/common/lib/utils";

import useCreateArticleService from "@articles/hooks/use-create-articles-service";

import FileUploadForm from "@dashboard/components/file-upload-form";
import { DASHBOARD_DIALOG_ID } from "@dashboard/constants/dashboard-dialog-id";
import { setDashboardDialogOpen } from "@dashboard/stores/dashboard-action-dialog-store";

import { serializeHtml } from "@editor/lib/serialize-html";
import { serializePlainText } from "@editor/lib/serialize-plain-text";

import { Alert, AlertTitle } from "@ui/alert";
import { Button } from "@ui/button";
import { DrawerClose } from "@ui/drawer";
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
import { Sheet, SheetContent, SheetTrigger } from "@ui/sheet";
import { Textarea } from "@ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";

import { zodResolver } from "@hookform/resolvers/zod";
import type { PlateCloudEditor } from "@udecode/plate-cloud";
import { useEditorMounted, useEditorRef } from "@udecode/plate-common";
import {
  AsteriskIcon,
  CheckIcon,
  CircleHelpIcon,
  Loader2Icon,
} from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ArticlesVisiblityEnum } from "@/common/types/articles-type";

type ArticlesCreateFormProps = {
  trigger?: React.ReactNode;
};

const formSchema = z.object({
  title: z
    .string()
    .min(8, "Title must be at least 8 characters")
    .max(1000, "Title must be less than 1024 characters"),
  description: z
    .string()
    .min(16, "Description must be at least 16 characters")
    .max(2048, "Description must be less than 2048 characters"),
  thumbnail: z
    .string({ required_error: "Thumbnail cannot be empty" })
    .url("The thumbnail cannot be empty"),
  visibility: ArticlesVisiblityEnum.default("PUBLIC"),
});

export default forwardRef<HTMLButtonElement, ArticlesCreateFormProps>(
  function ArticlesCreateForm({ trigger }, ref) {
    const editorRef = useEditorRef();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const isEditorMounted = useEditorMounted(editorRef.id);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        description: "",
        thumbnail: "",
        visibility: "PUBLIC",
      },
    });

    const {
      mutateAsync: uploadArticle,
      isSuccess,
      isPending: isCreatingArticle,
    } = useCreateArticleService();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      if (isEditorMounted) {
        const html = serializeHtml(editorRef as PlateCloudEditor);
        const plaintext = serializePlainText(editorRef.children);

        await uploadArticle({
          content_html: html,
          content_plain_text: plaintext,
          content_editor: JSON.stringify(editorRef.children),
          preview_title: values.title,
          preview_description: values.description,
          visibility: values.visibility,
          thumbnail: values.thumbnail,
        });
      }
    };

    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (isSuccess) {
        editorRef.reset();
        form.reset();
        closeRef.current?.click();
        setDashboardDialogOpen({
          id: DASHBOARD_DIALOG_ID.articles.editor,
          isOpen: false,
        });
      }
    }, [isSuccess, editorRef, form]);

    return (
      <Sheet modal={true}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger
              asChild
              ref={ref}
            >
              {trigger ?? (
                <Button
                  className="size-9 gap-4"
                  size={"icon"}
                >
                  <CheckIcon
                    className="size-4"
                    strokeWidth={3}
                  />
                  <span className="sr-only font-bold">Next Step</span>
                </Button>
              )}
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent
            className="font-bold"
            side="left"
          >
            Done
          </TooltipContent>
        </Tooltip>
        <SheetContent
          className="h-[90%] w-full bg-card px-32 pb-12"
          side={"bottom"}
        >
          <section className="flex h-full w-full flex-col items-center justify-center gap-12 pt-8 sm:flex-row">
            <div className="flex h-full w-full flex-col gap-4">
              <FileUploadForm
                formFieldKey={formSchema.keyof().Enum.thumbnail}
                outerForm={form}
                className="h-full [&>div]:max-h-none [&>div]:font-serif"
              />

              <Alert className="mt-6 items-center border-none bg-transparent pr-8">
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
                          className="max-h-12 overflow-x-hidden rounded-xl bg-background px-6 py-4 font-semibold"
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
                          className="max-h-48 min-h-32 overflow-x-hidden rounded-xl bg-background px-6 py-4 font-semibold"
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
                  <FormDescription className="italic text-foreground">
                    Our system will pick a category for you based on your
                    content. Once you sumbit, you will see the category badge
                    attachd to your articles.
                  </FormDescription>
                </FormItem>

                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center justify-center gap-4">
                    <DrawerClose asChild>
                      <Button
                        ref={closeRef}
                        type="button"
                        className="px-6 font-sans font-bold"
                        variant={"outline"}
                      >
                        Cancel
                      </Button>
                    </DrawerClose>
                    <Button
                      type={isCreatingArticle ? "button" : "submit"}
                      disabled={isCreatingArticle}
                      className={cn(
                        "gap-0 px-8 font-sans font-bold transition-all",
                        isCreatingArticle ? "gap-2 pl-6" : "",
                      )}
                    >
                      <Loader2Icon
                        className={cn(
                          "h-4 w-0 animate-spin transition-all",
                          isCreatingArticle ? "w-4" : "",
                        )}
                      />
                      Submit
                    </Button>
                  </div>

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
                            The title and description will be shown in the
                            preview card.
                          </AlertTitle>
                        </Alert>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </form>
            </Form>
          </section>
        </SheetContent>
      </Sheet>
    );
  },
);

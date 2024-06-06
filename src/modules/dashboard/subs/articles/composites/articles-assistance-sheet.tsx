import ErrorSection from "@/modules/error/components/error-section";

import { cn } from "@/common/lib/utils";

import AiMessageCard from "@articles/components/ai-message-card";
import usePostEnhanceArticlesService from "@articles/hooks/use-post-enhance-articles-service";
import {
  $articleAiPanelCollapseStore,
  $articleAiResultStore,
} from "@articles/stores/article-ai-store";
import { ArticlesEnhanceRequestSchema } from "@articles/types/articles-enhance-type";

import { AiDropdownMenu } from "@dashboard/composites/ai/ai-dropdown-menu";
import {
  $aiEnhanceStore,
  setAIEnhance,
} from "@dashboard/stores/ai-enhance-store";

import { Button } from "@ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@ui/form";
import { H3 } from "@ui/h3";
import { Small } from "@ui/small";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";

import { inputVariants } from "@plate-ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { TextareaAutosize } from "@udecode/plate-caption";
import {
  insertText,
  useEditorRef,
  useEditorSelection,
} from "@udecode/plate-common";
import { parse } from "htmlstring-to-react";
import {
  AlertTriangleIcon,
  BotMessageSquareIcon,
  ChevronLeftIcon,
  CopyCheckIcon,
  CopyIcon,
  Loader2Icon,
  Repeat2Icon,
  SparklesIcon,
  User2Icon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const EnhanceSchema = z.object({
  content: ArticlesEnhanceRequestSchema.shape.content.min(
    1,
    "Please do not enter emtpy content.",
  ),
  path: z.string(),
});

export default function ArticlesAssistanceSheet() {
  const isCollapsed = useStore($articleAiPanelCollapseStore);
  const enhanceObject = useStore($aiEnhanceStore);
  const aiProgress = useStore($articleAiResultStore);

  const [isCopiedToClipboard, setCopiedToClipboard] = useState(false);

  const form = useForm<z.infer<typeof EnhanceSchema>>({
    resolver: zodResolver(EnhanceSchema),
    defaultValues: {
      content: enhanceObject.body,
      path: "/content",
    },
  });

  const {
    mutate: enhanceArticle,
    isPending,
    isError,
  } = usePostEnhanceArticlesService();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCopyOutput = async (text: string) => {
    await navigator.clipboard.writeText(text).then(() => {
      setCopiedToClipboard(true);
      toast.success("Text copied to clipboard.", {
        position: "bottom-left",
        closeButton: true,
        onAutoClose: () => {
          setCopiedToClipboard(false);
        },
      });
    });
  };

  const editor = useEditorRef();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const selected = useEditorSelection();

  useEffect(() => {
    if (enhanceObject.body && enhanceObject.body.length)
      form.setValue("content", enhanceObject.body);
    if (enhanceObject.path) form.setValue("path", enhanceObject.path);

    if (enhanceObject.trigger) {
      buttonRef.current?.click();
      $articleAiResultStore.set({ output: "" });
    }
  }, [enhanceObject]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          if (values.content?.length)
            enhanceArticle({
              content: values.content,
              path: values.path,
            });
          setAIEnhance({
            ...enhanceObject,
            body: values.content,
            trigger: false,
          });
        })}
        className={cn(
          "relative flex h-full w-full min-w-96 flex-col items-start justify-start overflow-y-hidden bg-card pt-14 dark:bg-transparent",
          isCollapsed ? "w-0 opacity-0" : "opacity-100",
        )}
      >
        <div className="absolute flex h-fit w-full items-center bg-card p-2 dark:bg-background">
          <Button
            type="button"
            variant={"ghost"}
            className="items-center"
            onClick={() => $articleAiPanelCollapseStore.set(true)}
          >
            <ChevronLeftIcon className="mr-4 size-5" />
            <span className="font-bold">Hide Enhancements</span>
          </Button>
        </div>

        {isPending ||
          aiProgress.output ||
          isError ||
          form.formState.submitCount ? (
          <div
            className={cn(
              "h-full w-full max-w-full scroll-mt-32 gap-6 overflow-y-auto scroll-smooth px-6 pb-6 pt-16 text-base font-semibold transition-all",
              "flex flex-col items-center justify-start",
            )}
          >
            <AiMessageCard
              className="flex flex-col items-end self-end text-wrap break-words text-end"
              title={
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <span>{enhanceObject.title ?? "User"}</span>
                  <User2Icon className="size-4" />
                </div>
              }
            >
              <div className="flex w-fit rounded-3xl bg-background p-2 px-4 dark:bg-card">
                {enhanceObject.body?.length ? (
                  enhanceObject.body
                ) : (
                  <span className="text-muted-foreground">Empty Request</span>
                )}
              </div>
            </AiMessageCard>

            <AiMessageCard
              className="self-start text-wrap break-words"
              title={
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <BotMessageSquareIcon className="size-4" />
                  <span>Assistant</span>
                </div>
              }
              actions={
                <div
                  className={cn("flex w-full items-center justify-start gap-2")}
                >
                  <Button
                    type="button"
                    variant={"outline"}
                    className={cn("relative bg-transparent dark:bg-card")}
                    disabled={isPending || aiProgress.output?.length === 0}
                    size={"sm"}
                    onClick={() =>
                      insertText(editor, aiProgress.output, {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        at: selected ?? [0, 0],
                      })
                    }
                  >
                    <span className="font-bold">Insert</span>
                  </Button>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "relative size-9 bg-transparent dark:bg-card",
                        )}
                        disabled={isPending || aiProgress.output?.length === 0}
                        size={"icon"}
                        onClick={() => handleCopyOutput(aiProgress.output)}
                      >
                        <CopyIcon
                          className={cn(
                            "absolute size-4 transition-all",
                            isCopiedToClipboard ? "scale-0" : "scale-1",
                          )}
                        />

                        <CopyCheckIcon
                          className={cn(
                            "absolute size-4 transition-all",
                            isCopiedToClipboard ? "scale-1" : "scale-0",
                          )}
                        />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type={isPending ? "button" : "submit"}
                        variant={"default"}
                        size={"icon"}
                        className={cn(
                          "group size-9 gap-0 font-bold transition-all",
                        )}
                        disabled={isPending}
                      >
                        <Repeat2Icon
                          className={cn(
                            "h-4 w-0 transition-all duration-700 group-hover:rotate-[360deg]",
                            isPending ? "hidden" : "w-4",
                          )}
                        />
                        <Loader2Icon
                          className={cn(
                            "h-4 w-0 animate-spin transition-all",
                            isPending ? "w-4" : "hidden",
                          )}
                        />
                        <span className="sr-only">Run Again</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Run Again</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              }
            >
              {isError ? (
                <div className="flex items-center rounded-3xl bg-destructive/10 px-5 py-3 text-destructive">
                  <AlertTriangleIcon className="mr-4 size-5 min-w-5" />
                  <Small className="font-bold">
                    There was a problem getting your response!
                  </Small>
                </div>
              ) : aiProgress.output?.length ? (
                <div className="flex w-fit rounded-3xl bg-background px-5 py-3 dark:bg-card">
                  {parse(
                    aiProgress.output.replaceAll(
                      "\n",
                      `<br />`,
                    ),
                  )}
                </div>
              ) : (
                <div
                  className={cn(
                    "flex w-fit rounded-3xl bg-background px-5 py-3 dark:bg-card",
                    isPending ? "animate-pulse" : "",
                  )}
                >
                  {!isPending
                    ? "The response is empty. Please try again."
                    : "Working on your request..."}
                </div>
              )}
            </AiMessageCard>
          </div>
        ) : (
          <ErrorSection
            img={
              <SparklesIcon
                size={64}
                strokeWidth={2}
                className="mb-6"
              />
            }
            title={
              <H3 className="text-center font-extrabold">
                Suggestions will appear here
              </H3>
            }
            className="col-span-full row-span-full h-full w-full text-center"
            description="Select a range of text associate with our tools here, and see if it fits your satisfaction."
          />
        )}

        <div className="relative flex w-full items-end justify-end gap-4 self-end px-6 py-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormMessage className="font-bold italic" />
                <FormControl>
                  <div className="relative flex items-end justify-start">
                    <TextareaAutosize
                      className={cn(
                        "h-10 max-h-48 min-h-10 w-full font-serif font-semibold",
                        inputVariants({ variant: "default" }),
                        "resize-none rounded-3xl px-4 text-base",
                      )}
                      placeholder="Type some message..."
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={"outline"}
            size={"icon"}
            className="size-10 min-w-10"
            ref={buttonRef}
          >
            <Repeat2Icon className="size-4 min-w-4" />
            <span className="sr-only">Submit</span>
          </Button>

          <AiDropdownMenu
            trigger={
              <Button
                type="button"
                variant={"default"}
                className="relative size-10 min-w-10"
                size={"icon"}
              >
                <SparklesIcon className="size-4" />
                <span className="sr-only">AI Tools</span>
              </Button>
            }
          />
        </div>
      </form>
    </Form>
  );
}

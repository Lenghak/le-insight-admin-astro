import { $articleAiPanelCollapseStore } from "@/modules/dashboard/subs/articles/stores/article-ai-store";

import { Button } from "@/common/components/ui/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";

import { SpaModeToggle } from "@custom/theme";

import { WandSparklesIcon } from "lucide-react";
import React, { Suspense } from "react";

const ArticlesThumbnailForm = React.lazy(
  () => import("@articles/composites/articles-create-form"),
);

export default function ArticlesEditorRightPanel() {
  return (
    <section className="group fixed right-0 flex h-full w-fit flex-col items-center justify-between gap-6 p-6 pt-20 dark:bg-background">
      <div className="flex h-fit w-fit flex-col items-center justify-center gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => $articleAiPanelCollapseStore.set(false)}
            >
              <WandSparklesIcon className="h-4 w-4" />
              <span className="sr-only">Enhancements</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="font-bold"
            side="left"
          >
            Enhancements
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <SpaModeToggle
              variant={"ghost"}
              size={"icon"}
              className="gap-4"
            />
          </TooltipTrigger>
          <TooltipContent
            className="font-bold"
            side="left"
          >
            Themes
          </TooltipContent>
        </Tooltip>

        {/* <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              setAIEnhance({
                body: selected ?? serializePlainText(editorRef.children),
                path: "/title",
                trigger: true,
                title: "Suggesting Title",
              });
              $articleAiPanelCollapseStore.set(false);
            }}
          >
            <TypeIcon className="h-4 w-4" />
            <span className="sr-only">Suggest Title</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="font-bold"
          side="left"
        >
          Suggest Title
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              setAIEnhance({
                body:
                  serializePlainText(
                    editorRef.children.at(0)?.children ?? [],
                  ) ?? selected,
                path: "/content",
                trigger: true,
                title: "Suggesting Content",
              });
              $articleAiPanelCollapseStore.set(false);
            }}
          >
            <TextIcon className="h-4 w-4" />
            <span className="sr-only">Suggest Content</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="font-bold"
          side="left"
        >
          Suggest Content
        </TooltipContent>
      </Tooltip> */}
      </div>
      <Suspense>
        <ArticlesThumbnailForm />
      </Suspense>
    </section>
  );
}

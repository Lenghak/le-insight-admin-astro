import { $articleAiPanelCollapseStore } from "@articles/stores/article-ai-store";

import { Button } from "@ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";

import { SpaModeToggle } from "@custom/theme";

import { useStore } from "@nanostores/react";
import { WandSparklesIcon } from "lucide-react";
import React, { Suspense } from "react";

const ArticlesThumbnailForm = React.lazy(
  () => import("@articles/composites/articles-create-form"),
);

export default function ArticlesEditorRightPanel() {
  const isPanelCollapsed = useStore($articleAiPanelCollapseStore);
  return (
    <section className="group flex h-full w-fit flex-col items-end justify-between gap-6 p-4 pt-16 dark:bg-background">
      <div className="flex h-fit w-fit flex-col items-center justify-center gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() =>
                $articleAiPanelCollapseStore.set(!isPanelCollapsed)
              }
            >
              <WandSparklesIcon className="h-4 w-4" />
              <span className="sr-only">AI Assistant</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="font-bold"
            side="left"
          >
            AI Assistant
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex h-fit w-fit flex-col items-center justify-center gap-6">
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

        <Suspense>
          <ArticlesThumbnailForm />
        </Suspense>
      </div>
    </section>
  );
}

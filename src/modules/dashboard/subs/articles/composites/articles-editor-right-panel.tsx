import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";

import { SpaModeToggle } from "@custom/theme";

import React, { Suspense } from "react";

const ArticlesThumbnailForm = React.lazy(
  () => import("@articles/composites/articles-create-form"),
);

export default function ArticlesEditorRightPanel() {
  return (
    <section className="group fixed right-0 flex h-full w-fit flex-col items-center justify-between gap-6 p-6 pt-20 dark:bg-background">
      {/* <div className="flex h-fit w-fit flex-col items-center justify-center gap-6"> */}
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
      {/* </div> */}
    </section>
  );
}

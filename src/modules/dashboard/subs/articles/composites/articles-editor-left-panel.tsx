import { setAIEnhance } from "@/modules/dashboard/stores/ai-enhance-store";
import { serializePlainText } from "@/modules/editor/lib/serialize-plain-text";

import { $articleAiPanelCollapseStore } from "@articles/stores/article-ai-store";

import { Button } from "@ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";

import { getSelectionText, useEditorRef } from "@udecode/plate-common";
import { TextIcon, TypeIcon, WandSparklesIcon } from "lucide-react";

export default function ArticlesEditorLeftPanel() {
  const editorRef = useEditorRef();
  const selected = getSelectionText(editorRef);
  return (
    <section className="group fixed z-50 flex h-full w-fit flex-col items-end justify-center gap-6 p-6 dark:bg-background">
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

        <Tooltip>
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
                  icon: TypeIcon,
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
                  icon: TextIcon,
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
        </Tooltip>
      </div>
    </section>
  );
}

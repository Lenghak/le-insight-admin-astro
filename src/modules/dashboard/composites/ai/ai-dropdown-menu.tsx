import { serializePlainText } from "@/modules/editor/lib/serialize-plain-text";

import { DropdownMenuLabel, DropdownMenuSeparator } from "@/common/components/ui/dropdown-menu";

import { $articleAiPanelCollapseStore } from "@articles/stores/article-ai-store";

import {
  AIEnhanceTools,
  AiToneTools,
} from "@dashboard/constants/ai-tools-constants";
import {
  $aiEnhanceStore,
  setAIEnhance,
} from "@dashboard/stores/ai-enhance-store";

import { Small } from "@ui/small";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useOpenState,
} from "@plate-ui/dropdown-menu";
import { ToolbarButton } from "@plate-ui/toolbar";

import { useStore } from "@nanostores/react";
import type { DropdownMenuProps as PrimitiveDropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { cn } from "@udecode/cn";
import { getSelectionText, useEditorRef } from "@udecode/plate-common";
import { SparklesIcon, SpeechIcon, TextIcon, TypeIcon } from "lucide-react";
import { Fragment, useId } from "react";

interface DropdownMenuProps extends PrimitiveDropdownMenuProps {
  triggerClassName?: string;
  isDropdown?: boolean;
  trigger?: React.ReactNode;
}

export function AiDropdownMenu({ trigger, ...props }: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();
  const aiEnhanceObject = useStore($aiEnhanceStore);
  const selected = getSelectionText(editor);

  return (
    <DropdownMenu
      modal={false}
      {...openState}
      {...props}
    >
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <ToolbarButton
            className={cn(
              props.triggerClassName,
              "flex items-center gap-4 text-orange-600 hover:bg-orange-600/10 hover:text-orange-600 focus-visible:ring-orange-500",
            )}
            pressed={openState.open}
            tooltip="AI Tools"
            isDropdown={props.isDropdown ?? true}
          >
            <SparklesIcon className="mr-4 size-4" />
            <Small className="font-bold">AI Tools</Small>
          </ToolbarButton>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-6 w-64 space-y-2 font-semibold">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Generative
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setAIEnhance({
                body: selected ?? serializePlainText(editor.children),
                path: "/title",
                trigger: true,
                title: "Suggesting Title",
              });
              $articleAiPanelCollapseStore.set(false);
            }}
          >
            <TypeIcon className="mr-4 h-4 w-4" />
            <span>Suggest Title</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setAIEnhance({
                body:
                  serializePlainText(editor.children.at(0)?.children ?? []) ??
                  selected,
                path: "/content",
                trigger: true,
                title: "Suggesting Content",
              });
              $articleAiPanelCollapseStore.set(false);
            }}
          >
            <TextIcon className="mr-4 h-4 w-4" />
            <span>Suggest Content</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-transparent" />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Enhancements
          </DropdownMenuLabel>
          {AIEnhanceTools.map((tool, index) => (
            <Fragment key={useId()}>
              <DropdownMenuItem
                onClick={() => {
                  setAIEnhance({
                    body:
                      getSelectionText(editor).trim() ?? aiEnhanceObject.body,
                    path: tool.path,
                    trigger: true,
                    title: tool.title,
                  });
                  $articleAiPanelCollapseStore.set(false);
                }}
              >
                <tool.icon className="mr-4 h-4 w-4" />
                <span>{tool.label}</span>
              </DropdownMenuItem>

              {index === 3 && (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <SpeechIcon className="mr-4 h-4 w-4" />
                    <span>Adjust Tones</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="font-semibold">
                      {AiToneTools.map((tone) => (
                        <DropdownMenuItem
                          key={useId()}
                          onClick={() => {
                            setAIEnhance({
                              body: getSelectionText(editor),
                              path: "/tone/" + tone.label,
                              trigger: true,
                              title: tone.label + " Toning",
                            });
                            $articleAiPanelCollapseStore.set(false);
                          }}
                        >
                          <tone.icon className="mr-4 h-4 w-4" />
                          <span className="capitalize">{tone.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )}
            </Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

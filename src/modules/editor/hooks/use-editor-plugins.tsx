import { createPlateUI } from "@editor/lib/create-plate-ui";
import { alignPlugin } from "@editor/plugins/align-plugin";
import { autoformatIndentLists } from "@editor/plugins/auto-format-indent-lists";
import { autoformatLists } from "@editor/plugins/auto-format-lists";
import { autoformatRules } from "@editor/plugins/auto-format-rules";
import { captionPlugin } from "@editor/plugins/caption-plugin";
import { dragOverCursorPlugin } from "@editor/plugins/drag-over-cursor-plugin";
import { emojiPlugin } from "@editor/plugins/emoji-plugin";
import { exitBreakPlugin } from "@editor/plugins/exit-break-plugin";
import { forcedLayoutPlugin } from "@editor/plugins/forced-layout-plugin";
import { indentPlugin } from "@editor/plugins/indent-plugin";
import { lineHeightPlugin } from "@editor/plugins/line-height-plugin";
import { linkPlugin } from "@editor/plugins/link-plugin";
import { resetBlockTypePlugin } from "@editor/plugins/reset-block-type-plugin";
import { selectOnBackspacePlugin } from "@editor/plugins/select-on-backspace-plugin";
import { softBreakPlugin } from "@editor/plugins/soft-break-plugin";
import { tabbablePlugin } from "@editor/plugins/tabbable-plugin";
import { trailingBlockPlugin } from "@editor/plugins/trailing-block-plugin";
import { settingsStore } from "@editor/stores/settings-store";

import { createAlignPlugin } from "@udecode/plate-alignment";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
} from "@udecode/plate-basic-marks";
import { createBlockquotePlugin } from "@udecode/plate-block-quote";
import {
  createExitBreakPlugin,
  createSingleLinePlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createCaptionPlugin } from "@udecode/plate-caption";
import { createCodeBlockPlugin } from "@udecode/plate-code-block";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { createCommentsPlugin } from "@udecode/plate-comments";
import {
  createPlugins,
  type PlatePluginComponent,
} from "@udecode/plate-common";
import { createDndPlugin } from "@udecode/plate-dnd";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import { createExcalidrawPlugin } from "@udecode/plate-excalidraw";
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font";
import { createHeadingPlugin } from "@udecode/plate-heading";
import { createHighlightPlugin } from "@udecode/plate-highlight";
import { createHorizontalRulePlugin } from "@udecode/plate-horizontal-rule";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createIndentListPlugin } from "@udecode/plate-indent-list";
import { createJuicePlugin } from "@udecode/plate-juice";
import { createKbdPlugin } from "@udecode/plate-kbd";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createLinkPlugin } from "@udecode/plate-link";
import { createListPlugin, createTodoListPlugin } from "@udecode/plate-list";
import {
  createImagePlugin,
  createMediaEmbedPlugin,
} from "@udecode/plate-media";
import { createMentionPlugin } from "@udecode/plate-mention";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createNormalizeTypesPlugin } from "@udecode/plate-normalizers";
import { createParagraphPlugin } from "@udecode/plate-paragraph";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import {
  createDeletePlugin,
  createSelectOnBackspacePlugin,
} from "@udecode/plate-select";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import { createTablePlugin } from "@udecode/plate-table";
import { createTogglePlugin } from "@udecode/plate-toggle";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { useMemo } from "react";

export const useEditorPlugins = ({
  id,
  components = createPlateUI(),
}: {
  id?: string;
  components?: Record<string, PlatePluginComponent>;
} = {}) => {
  const enabled = settingsStore.use.checkedPlugins();

  const autoformatOptions = {
    rules: [...autoformatRules],
    enableUndoOnDelete: true,
  };

  if (id === "indentlist") {
    autoformatOptions.rules.push(...autoformatIndentLists);
  } else if (id === "list") {
    autoformatOptions.rules.push(...autoformatLists);
  } else if (enabled.listStyleType) {
    autoformatOptions.rules.push(...autoformatIndentLists);
  } else if (enabled.list) {
    autoformatOptions.rules.push(...autoformatLists);
  }

  return useMemo(() => {
    return createPlugins(
      [
        // Nodes
        createParagraphPlugin({ enabled: !!enabled.p }),
        createHeadingPlugin({ enabled: !!enabled.heading }),
        createBlockquotePlugin({ enabled: !!enabled.blockquote }),
        createCodeBlockPlugin({ enabled: !!enabled.code_block }),
        createHorizontalRulePlugin({ enabled: !!enabled.hr }),
        createLinkPlugin({ ...linkPlugin, enabled: !!enabled.a }),
        createListPlugin({
          enabled: id === "list" || !!enabled.list,
        }),
        createImagePlugin({ enabled: !!enabled.img }),
        createMediaEmbedPlugin({ enabled: !!enabled.media_embed }),
        createCaptionPlugin({ ...captionPlugin, enabled: !!enabled.caption }),
        createMentionPlugin({
          enabled: !!enabled.mention,
          options: {
            triggerPreviousCharPattern: /^$|^[\s"']$/,
          },
        }),
        createTablePlugin({
          enabled: !!enabled.table,
          options: {
            enableMerging: id === "tableMerge",
          },
        }),
        createTodoListPlugin({ enabled: !!enabled.action_item }),
        createTogglePlugin({ enabled: !!enabled.toggle }),
        createExcalidrawPlugin({ enabled: !!enabled.excalidraw }),

        // Marks
        createBoldPlugin({ enabled: !!enabled.bold }),
        createItalicPlugin({ enabled: !!enabled.italic }),
        createUnderlinePlugin({ enabled: !!enabled.underline }),
        createStrikethroughPlugin({ enabled: !!enabled.strikethrough }),
        createCodePlugin({ enabled: !!enabled.code }),
        createSubscriptPlugin({ enabled: !!enabled.subscript }),
        createSuperscriptPlugin({ enabled: !!enabled.superscript }),
        createFontColorPlugin({ enabled: !!enabled.color }),
        createFontBackgroundColorPlugin({
          enabled: !!enabled.backgroundColor,
        }),
        createFontSizePlugin({ enabled: !!enabled.fontSize }),
        createHighlightPlugin({ enabled: !!enabled.highlight }),
        createKbdPlugin({ enabled: !!enabled.kbd }),

        // Block Style
        createAlignPlugin({ ...alignPlugin, enabled: !!enabled.align }),
        createIndentPlugin({ ...indentPlugin, enabled: !!enabled.indent }),
        createIndentListPlugin({
          ...indentPlugin,
          enabled: id === "indentlist" || !!enabled.listStyleType,
        }),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        createLineHeightPlugin({
          ...lineHeightPlugin,
          enabled: !!enabled.lineHeight,
        }),

        // Functionality
        createAutoformatPlugin({
          enabled: !!enabled.autoformat,
          options: autoformatOptions,
        }),
        createBlockSelectionPlugin({
          options: {
            sizes: {
              top: 0,
              bottom: 0,
            },
          },
          enabled: id === "blockselection" || !!enabled.blockSelection,
        }),
        createComboboxPlugin({ enabled: !!enabled.combobox }),
        createDndPlugin({
          options: { enableScroller: true },
          enabled: !!enabled.dnd,
        }),
        createEmojiPlugin({ ...emojiPlugin, enabled: !!enabled.emoji }),
        createExitBreakPlugin({
          ...exitBreakPlugin,
          enabled: !!enabled.exitBreak,
        }),
        createNodeIdPlugin({ enabled: !!enabled.nodeId }),
        createNormalizeTypesPlugin({
          ...forcedLayoutPlugin,
          enabled: !!enabled.normalizeTypes,
        }),
        createResetNodePlugin({
          ...resetBlockTypePlugin,
          enabled: !!enabled.resetNode,
        }),
        createSelectOnBackspacePlugin({
          ...selectOnBackspacePlugin,
          enabled: !!enabled.selectOnBackspace,
        }),
        createDeletePlugin({
          enabled: !!enabled.delete,
        }),
        createSingleLinePlugin({
          enabled: id === "singleline" || !!enabled.singleLine,
        }),
        createSoftBreakPlugin({
          ...softBreakPlugin,
          enabled: !!enabled.softBreak,
        }),
        createTabbablePlugin({
          ...tabbablePlugin,
          enabled: !!enabled.tabbable,
        }),
        createTrailingBlockPlugin({
          ...trailingBlockPlugin,
          enabled: id !== "singleline" && !!enabled.trailingBlock,
        }),
        { ...dragOverCursorPlugin, enabled: !!enabled.dragOverCursor },

        // Collaboration
        createCommentsPlugin({ enabled: !!enabled.comment }),

        // Deserialization

        createDeserializeDocxPlugin({ enabled: !!enabled.deserializeDocx }),
        createDeserializeMdPlugin({ enabled: !!enabled.deserializeMd }),
        createJuicePlugin({ enabled: !!enabled.juice }),
      ],
      {
        components,
      },
    );
  }, [enabled, id, autoformatOptions, components]);
};

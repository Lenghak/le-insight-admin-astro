import { EDITOR_COMPONENT } from "@editor/constants/editor-components";
import { alignPlugin } from "@editor/plugins/align-plugin";
import { autoformatPlugin } from "@editor/plugins/auto-format-plugin";
import { captionPlugin } from "@editor/plugins/caption-plugin";
import { dragOverCursorPlugin } from "@editor/plugins/drag-over-cursor-plugin";
import { emojiPlugin } from "@editor/plugins/emoji-plugin";
import { exitBreakPlugin } from "@editor/plugins/exit-break-plugin";
import { forcedLayoutPlugin } from "@editor/plugins/forced-layout-plugin";
import { indentListPlugin } from "@editor/plugins/indent-list-plugin";
import { indentPlugin } from "@editor/plugins/indent-plugin";
import { lineHeightPlugin } from "@editor/plugins/line-height-plugin";
import { selectOnBackspacePlugin } from "@editor/plugins/select-on-backspace-plugin";
import { softBreakPlugin } from "@editor/plugins/soft-break-plugin";
import { tabbablePlugin } from "@editor/plugins/tabbable-plugin";
import { trailingBlockPlugin } from "@editor/plugins/trailing-block-plugin";
import getCloudAuthToken from "@editor/services/cloud-auth-api";

import { LinkFloatingToolbar } from "@plate-ui/link-floating-toolbar";
import { withPlaceholders } from "@plate-ui/placeholder";
import { withDraggables } from "@plate-ui/with-draggables";

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
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
  createCloudAttachmentPlugin,
  createCloudImagePlugin,
  createCloudPlugin,
} from "@udecode/plate-cloud";
import { createCodeBlockPlugin } from "@udecode/plate-code-block";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { createCommentsPlugin } from "@udecode/plate-comments";
import {
  createDeserializeAstPlugin,
  createDeserializeHtmlPlugin,
  createPlugins,
  type RenderAfterEditable,
} from "@udecode/plate-common";
import { createDndPlugin } from "@udecode/plate-dnd";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import { createExcalidrawPlugin } from "@udecode/plate-excalidraw";
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontFamilyPlugin,
  createFontSizePlugin,
  createFontWeightPlugin,
} from "@udecode/plate-font";
import { createHeadingPlugin } from "@udecode/plate-heading";
import { createHighlightPlugin } from "@udecode/plate-highlight";
import { createHorizontalRulePlugin } from "@udecode/plate-horizontal-rule";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createIndentListPlugin } from "@udecode/plate-indent-list";
import { createJuicePlugin } from "@udecode/plate-juice";
import { createKbdPlugin } from "@udecode/plate-kbd";
import { createColumnPlugin } from "@udecode/plate-layout";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createLinkPlugin } from "@udecode/plate-link";
import { createTodoListPlugin } from "@udecode/plate-list";
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
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createSlashPlugin } from "@udecode/plate-slash-command";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import { createTablePlugin } from "@udecode/plate-table";
import { createTogglePlugin } from "@udecode/plate-toggle";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";

export const EDITOR_PLUGINS = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createExcalidrawPlugin(),
    createCloudPlugin({
      options: {
        authToken: async () => {
          const { data: res } = await getCloudAuthToken();
          return res.data.attributes.token;
        },
      },
    }),
    createCloudAttachmentPlugin(),
    createCloudImagePlugin({
      options: {
        maxInitialWidth: 320,
        maxInitialHeight: 320,
        minResizeWidth: 100,
        maxResizeWidth: 720,
      },
    }),
    createTogglePlugin(),
    createColumnPlugin(),
    createMediaEmbedPlugin(),
    createCaptionPlugin({
      ...captionPlugin,
    }),
    createMentionPlugin(),
    createTablePlugin(),
    createTodoListPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createFontFamilyPlugin(),
    createFontWeightPlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin({ ...alignPlugin }),
    createIndentPlugin({ ...indentPlugin }),
    createIndentListPlugin({
      ...indentListPlugin,
    }),
    createLineHeightPlugin({
      ...lineHeightPlugin,
    }),
    createAutoformatPlugin({
      ...autoformatPlugin,
    }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createComboboxPlugin(),
    createDndPlugin({
      options: { enableScroller: true },
    }),
    createEmojiPlugin({
      ...emojiPlugin,
    }),
    createExitBreakPlugin({
      ...exitBreakPlugin,
    }),
    createNodeIdPlugin(),
    createNormalizeTypesPlugin({
      ...forcedLayoutPlugin,
    }),
    createResetNodePlugin({
      options: {
        rules: [],
      },
    }),
    createSelectOnBackspacePlugin({
      ...selectOnBackspacePlugin,
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      ...softBreakPlugin,
    }),
    createSlashPlugin({
      options: {
        // rules: SLASH_RULES
      },
    }),
    createTabbablePlugin({
      ...tabbablePlugin,
    }),
    createTrailingBlockPlugin({
      ...trailingBlockPlugin,
    }),
    { ...dragOverCursorPlugin },
    createCommentsPlugin(),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin(),
    createDeserializeHtmlPlugin(),
    createDeserializeAstPlugin(),
    createJuicePlugin(),
  ],
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    components: withDraggables(withPlaceholders(EDITOR_COMPONENT)),
  },
);

export const SERIALIZE_PLUGINS = EDITOR_PLUGINS?.filter(
  (plugin) => plugin?.key !== "toggle" && plugin?.key !== "blockSelection",
);

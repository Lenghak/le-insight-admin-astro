
import { CloudAttachmentElement } from "@/common/components/plate-ui/cloud-attachment-element";
import { CloudImageElement } from "@/common/components/plate-ui/cloud-image-element";
import { BlockquoteElement } from "@plate-ui/blockquote-element";
import { CodeBlockElement } from "@plate-ui/code-block-element";
import { CodeLeaf } from "@plate-ui/code-leaf";
import { CodeLineElement } from "@plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@plate-ui/code-syntax-leaf";
import { ColumnElement } from "@plate-ui/column-element";
import { ColumnGroupElement } from "@plate-ui/column-group-element";
import { CommentLeaf } from "@plate-ui/comment-leaf";
import { ExcalidrawElement } from "@plate-ui/excalidraw-element";
import { HeadingElement } from "@plate-ui/heading-element";
import { HighlightLeaf } from "@plate-ui/highlight-leaf";
import { HrElement } from "@plate-ui/hr-element";
import { ImageElement } from "@plate-ui/image-element";
import { KbdLeaf } from "@plate-ui/kbd-leaf";
import { LinkElement } from "@plate-ui/link-element";
import { MediaEmbedElement } from "@plate-ui/media-embed-element";
import { MentionElement } from "@plate-ui/mention-element";
import { MentionInputElement } from "@plate-ui/mention-input-element";
import { ParagraphElement } from "@plate-ui/paragraph-element";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@plate-ui/table-cell-element";
import { TableElement } from "@plate-ui/table-element";
import { TableRowElement } from "@plate-ui/table-row-element";
import { TodoListElement } from "@plate-ui/todo-list-element";
import { ToggleElement } from "@plate-ui/toggle-element";

import { withProps } from "@udecode/cn";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from "@udecode/plate-basic-marks";
import {
  ELEMENT_BLOCKQUOTE
} from "@udecode/plate-block-quote";
import { ELEMENT_CLOUD_ATTACHMENT, ELEMENT_CLOUD_IMAGE } from "@udecode/plate-cloud";
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX
} from "@udecode/plate-code-block";
import { MARK_COMMENT } from "@udecode/plate-comments";
import {
  PlateLeaf
} from "@udecode/plate-common";
import {
  ELEMENT_EXCALIDRAW
} from "@udecode/plate-excalidraw";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6
} from "@udecode/plate-heading";
import {
  MARK_HIGHLIGHT
} from "@udecode/plate-highlight";
import {
  ELEMENT_HR
} from "@udecode/plate-horizontal-rule";
import { MARK_KBD } from "@udecode/plate-kbd";
import {
  ELEMENT_COLUMN,
  ELEMENT_COLUMN_GROUP
} from "@udecode/plate-layout";
import { ELEMENT_LINK } from "@udecode/plate-link";
import {
  ELEMENT_TODO_LI
} from "@udecode/plate-list";
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED
} from "@udecode/plate-media";
import {
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT
} from "@udecode/plate-mention";
import {
  ELEMENT_PARAGRAPH
} from "@udecode/plate-paragraph";
import {
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR
} from "@udecode/plate-table";
import { ELEMENT_TOGGLE } from "@udecode/plate-toggle";


export const EDITOR_COMPONENT = {
  [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
  [ELEMENT_CODE_LINE]: CodeLineElement,
  [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
  [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
  [ELEMENT_HR]: HrElement,
  [ELEMENT_IMAGE]: ImageElement,
  [ELEMENT_CLOUD_ATTACHMENT]: CloudAttachmentElement,
  [ELEMENT_CLOUD_IMAGE]: CloudImageElement,
  [ELEMENT_LINK]: LinkElement,
  [ELEMENT_TOGGLE]: ToggleElement,
  [ELEMENT_COLUMN_GROUP]: ColumnGroupElement,
  [ELEMENT_COLUMN]: ColumnElement,
  [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
  [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
  [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
  [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
  [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
  [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
  [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
  [ELEMENT_MENTION]: MentionElement,
  [ELEMENT_MENTION_INPUT]: MentionInputElement,
  [ELEMENT_PARAGRAPH]: ParagraphElement,
  [ELEMENT_TABLE]: TableElement,
  [ELEMENT_TR]: TableRowElement,
  [ELEMENT_TD]: TableCellElement,
  [ELEMENT_TH]: TableCellHeaderElement,
  [ELEMENT_TODO_LI]: TodoListElement,
  [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
  [MARK_CODE]: CodeLeaf,
  [MARK_COMMENT]: CommentLeaf,
  [MARK_HIGHLIGHT]: HighlightLeaf,
  [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
  [MARK_KBD]: KbdLeaf,
  [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
  [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
  [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
  [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
}
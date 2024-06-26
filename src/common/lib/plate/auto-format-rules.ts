import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  type AutoformatRule,
  autoformatSmartQuotes,
} from "@udecode/plate-autoformat";

import { autoformatBlocks } from "./auto-format-blocks";
import { autoformatMarks } from "./auto-format-mark";

export const autoformatRules: AutoformatRule[] = [
  ...autoformatBlocks,
  ...autoformatMarks,
  ...autoformatSmartQuotes,
  ...autoformatPunctuation,
  ...autoformatLegal,
  ...autoformatLegalHtml,
  ...autoformatArrow,
  ...autoformatMath,
];

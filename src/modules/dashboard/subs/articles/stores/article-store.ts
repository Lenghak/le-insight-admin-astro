import { persistentAtom } from "@nanostores/persistent";
import type { TElement } from "@udecode/plate-common";

export const $editingArticle = persistentAtom<TElement[]>(
  "editing_article",
  [
    { id: 1, type: "h1", children: [{ text: "" }] },
    {
      type: "p",
      children: [{ text: "" }],
    },
  ],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

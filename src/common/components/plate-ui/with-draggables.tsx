import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import { ELEMENT_CODE_BLOCK } from "@udecode/plate-code-block";
import { createNodesWithHOC } from "@udecode/plate-common";
import {
  withDraggable as withDraggablePrimitive,
  type WithDraggableOptions,
} from "@udecode/plate-dnd";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import { ELEMENT_OL, ELEMENT_UL } from "@udecode/plate-list";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import type { FC } from "react";

import { Draggable, type DraggableProps } from "./draggable";

export const withDraggable = (
  Component: FC,
  options?: WithDraggableOptions<
    Partial<Omit<DraggableProps, "editor" | "element" | "children">>
  >,
) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  withDraggablePrimitive<DraggableProps>(Draggable, Component, options as any);

export const withDraggablesPrimitive = createNodesWithHOC(withDraggable);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withDraggables = (components: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return withDraggablesPrimitive(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      level: 0,
    },
    {
      key: ELEMENT_H1,
      draggableProps: {
        classNames: {
          gutterLeft: "px-0 pb-1 text-[1.875em]",
          blockToolbarWrapper: "h-[1.3em]",
        },
      },
    },
    {
      key: ELEMENT_H2,
      draggableProps: {
        classNames: {
          gutterLeft: "px-0 pb-1 text-[1.5em]",
          blockToolbarWrapper: "h-[1.3em]",
        },
      },
    },
    {
      key: ELEMENT_H3,
      draggableProps: {
        classNames: {
          gutterLeft: "pt-[2px] px-0 pb-1 text-[1.25em]",
          blockToolbarWrapper: "h-[1.3em]",
        },
      },
    },
    {
      keys: [ELEMENT_H4, ELEMENT_H5],
      draggableProps: {
        classNames: {
          gutterLeft: "pt-[3px] px-0 pb-0 text-[1.1em]",
          blockToolbarWrapper: "h-[1.3em]",
        },
      },
    },
    {
      keys: [ELEMENT_PARAGRAPH],
      draggableProps: {
        classNames: {
          gutterLeft: "pt-[3px] px-0 pb-0",
        },
      },
    },
    {
      keys: [ELEMENT_H6, ELEMENT_UL, ELEMENT_OL],
      draggableProps: {
        classNames: {
          gutterLeft: "px-0 pb-0",
        },
      },
    },
    {
      key: ELEMENT_BLOCKQUOTE,
      draggableProps: {
        classNames: {
          gutterLeft: "px-0 pb-0",
        },
      },
    },
    {
      key: ELEMENT_CODE_BLOCK,
      draggableProps: {
        classNames: {
          gutterLeft: "pt-8 px-0 pb-0",
        },
      },
    },
  ]);
};

import { cn } from "@udecode/cn";
import { createZustandStore } from "@udecode/plate-common";
import {
  type CursorData,
  CursorOverlay as CursorOverlayPrimitive,
  type CursorOverlayProps,
  type CursorProps,
} from "@udecode/plate-cursor";

export const cursorStore = createZustandStore("cursor")({
  cursors: {},
});

export function Cursor({
  data,
  selectionRects,
  caretPosition,
  disableCaret,
  disableSelection,
  classNames,
}: CursorProps<CursorData>) {
  if (!data) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { style, selectionStyle = style } = data;

  return (
    <>
      {!disableSelection &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
        ((selectionRects as Array<any>) ?? []).map((position, i) => (
          <div
            key={i}
            className={cn(
              "pointer-events-none absolute z-10 opacity-[0.3]",
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
              classNames?.selectionRect,
            )}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            style={{
              ...selectionStyle,
              ...position,
            }}
          />
        ))}
      {!disableCaret && caretPosition && (
        <div
          className={cn(
            "pointer-events-none absolute z-10 w-0.5",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            classNames?.caret,
          )}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          style={{ ...caretPosition, ...style }}
        />
      )}
    </>
  );
}

export function CursorOverlay({ cursors, ...props }: CursorOverlayProps) {
  const dynamicCursors = cursorStore.use.cursors();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const allCursors = { ...cursors, ...dynamicCursors };

  return (
    <CursorOverlayPrimitive
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      cursors={allCursors}
      onRenderCursor={Cursor}
    />
  );
}

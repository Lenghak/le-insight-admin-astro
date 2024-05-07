import { cn } from "@udecode/cn";
import {
  type EmojiCategoryList,
  type IEmojiFloatingLibrary,
  type UseEmojiPickerType,
} from "@udecode/plate-emoji";

export type EmojiPickerNavigationProps = Pick<
  UseEmojiPickerType,
  "i18n" | "emojiLibrary" | "icons" | "focusedCategory"
> & {
  onClick: (id: EmojiCategoryList) => void;
};

const getBarProperty = (
  emojiLibrary: IEmojiFloatingLibrary,
  focusedCategory?: EmojiCategoryList,
) => {
  let width = 0;
  let position = 0;
  if (focusedCategory) {
    width = 100 / emojiLibrary.getGrid().size;
    position = focusedCategory
      ? emojiLibrary.indexOf(focusedCategory) * 100
      : 0;
  }

  return { width, position };
};

export function EmojiPickerNavigation({
  i18n,
  icons,
  emojiLibrary,
  focusedCategory,
  onClick,
}: EmojiPickerNavigationProps) {
  const { width, position } = getBarProperty(emojiLibrary, focusedCategory);

  return (
    <nav
      id="emoji-nav"
      className="mb-2.5 border-0 border-b border-solid border-b-border p-3"
    >
      <div className="relative flex">
        {emojiLibrary
          .getGrid()
          .sections()
          .map(({ id }) => (
            <button
              key={id}
              aria-label={i18n.categories[id]}
              title={i18n.categories[id]}
              type="button"
              className={cn(
                "flex grow cursor-pointer items-center justify-center border-none bg-transparent fill-current text-sm text-muted-foreground hover:text-foreground",
                id === focusedCategory &&
                  "pointer-events-none fill-current text-primary",
              )}
              onClick={() => onClick(id)}
            >
              <span style={{ width: "18px", height: "18px" }}>
                {icons.categories[id].outline}
              </span>
            </button>
          ))}
        <div
          className="absolute -bottom-3 left-0 h-[4px] w-full rounded-t-lg bg-primary opacity-100 transition-transform duration-200"
          style={{
            visibility: `${focusedCategory ? "visible" : "hidden"}`,
            width: `${width}%`,
            transform: `translateX(${position}%)`,
          }}
        />
      </div>
    </nav>
  );
}
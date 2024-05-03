import { cn } from "@udecode/cn";
import { EmojiSettings, type UseEmojiPickerType } from "@udecode/plate-emoji";

import { EmojiPickerContent } from "./emoji-picker-content";
import { EmojiPickerNavigation } from "./emoji-picker-navigation";
import { EmojiPickerPreview } from "./emoji-picker-preview";
import { EmojiPickerSearchAndClear } from "./emoji-picker-search-and-clear";
import { EmojiPickerSearchBar } from "./emoji-picker-searchbar";

export function EmojiPicker({
  i18n,
  searchValue,
  setSearch,
  clearSearch,
  isSearching,
  hasFound,
  searchResult,
  emoji,
  onSelectEmoji,
  onMouseOver,
  emojiLibrary,
  icons,
  handleCategoryClick,
  focusedCategory,
  visibleCategories,
  refs,
  settings = EmojiSettings,
}: UseEmojiPickerType) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl bg-card",
        "mr-8 h-[350px] w-[316px] border shadow-md",
      )}
    >
      <EmojiPickerNavigation
        i18n={i18n}
        emojiLibrary={emojiLibrary}
        icons={icons}
        focusedCategory={focusedCategory}
        onClick={handleCategoryClick}
      />
      <EmojiPickerSearchBar
        i18n={i18n}
        setSearch={setSearch}
        searchValue={searchValue}
      >
        <EmojiPickerSearchAndClear
          i18n={i18n}
          clearSearch={clearSearch}
          searchValue={searchValue}
        />
      </EmojiPickerSearchBar>
      <EmojiPickerContent
        i18n={i18n}
        emojiLibrary={emojiLibrary}
        isSearching={isSearching}
        searchResult={searchResult}
        visibleCategories={visibleCategories}
        settings={settings}
        onSelectEmoji={onSelectEmoji}
        onMouseOver={onMouseOver}
        refs={refs}
      />
      <EmojiPickerPreview
        i18n={i18n}
        emoji={emoji}
        hasFound={hasFound}
        isSearching={isSearching}
      />
    </div>
  );
}

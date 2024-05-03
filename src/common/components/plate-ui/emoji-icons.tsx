import { type EmojiCategoryList } from "@udecode/plate-emoji";
import {
  AppleIcon,
  CastleIcon,
  ClockIcon,
  DeleteIcon,
  FlagIcon,
  LeafIcon,
  LightbulbIcon,
  MusicIcon,
  SearchIcon,
  SmileIcon,
  StarIcon,
} from "lucide-react";
import React from "react";
import { TbBallBasketball } from "react-icons/tb";

export const emojiCategoryIcons: Record<
  EmojiCategoryList,
  { outline: React.ReactElement; solid: React.ReactElement }
> = {
  activity: {
    outline: <TbBallBasketball className="size-full" />,
    solid: <TbBallBasketball className="size-full" />,
  },

  custom: {
    outline: <StarIcon className="size-full" />,
    solid: <StarIcon className="size-full" />,
  },

  flags: {
    outline: <FlagIcon className="size-full" />,
    solid: <FlagIcon className="size-full" />,
  },

  foods: {
    outline: <AppleIcon className="size-full" />,
    solid: <AppleIcon className="size-full" />,
  },

  frequent: {
    outline: <ClockIcon className="size-full" />,
    solid: <ClockIcon className="size-full" />,
  },

  nature: {
    outline: <LeafIcon className="size-full" />,
    solid: <LeafIcon className="size-full" />,
  },

  objects: {
    outline: <LightbulbIcon className="size-full" />,
    solid: <LightbulbIcon className="size-full" />,
  },

  people: {
    outline: <SmileIcon className="size-full" />,
    solid: <SmileIcon className="size-full" />,
  },

  places: {
    outline: <CastleIcon className="size-full" />,
    solid: <CastleIcon className="size-full" />,
  },

  symbols: {
    outline: <MusicIcon className="size-full" />,
    solid: <MusicIcon className="size-full" />,
  },
};

export const emojiSearchIcons = {
  loupe: <SearchIcon className="size-4" />,

  delete: <DeleteIcon className="size-4" />,
};

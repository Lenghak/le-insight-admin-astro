import { persistentMap } from "@nanostores/persistent";

export const $sidebar = persistentMap<{ isCollapsed: boolean }>("side-bar", { isCollapsed: true }, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const setCollapsed = (value: boolean) => $sidebar.set({ isCollapsed: value });

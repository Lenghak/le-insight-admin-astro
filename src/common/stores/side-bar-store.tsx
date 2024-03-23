import { map } from "nanostores";

export const $sidebar = map<{ isCollapsed: boolean }>({ isCollapsed: true });

export const setCollapsed = (value: boolean) =>
  $sidebar.set({ isCollapsed: value });

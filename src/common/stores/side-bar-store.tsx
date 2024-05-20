import { persistentAtom } from "@nanostores/persistent";

export const $sidebar = persistentAtom<boolean>("side-bar", true, {
	encode: JSON.stringify,
	decode: JSON.parse,
});

export const setCollapsed = (value: boolean) => $sidebar.set(value);

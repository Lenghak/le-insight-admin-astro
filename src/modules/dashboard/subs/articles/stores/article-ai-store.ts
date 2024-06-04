import { atom, map } from "nanostores";

export const $articleAiPanelCollapseStore = atom(true);
export const $articleAiResultStore = map({
	output: "",
});

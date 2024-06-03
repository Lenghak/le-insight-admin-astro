import { map } from "nanostores";

export const $aiEnhanceStore = map<{
	url: string | undefined;
	body: string | undefined;
}>({
	url: undefined,
	body: undefined,
});

export const setAIEnhance = () => {};

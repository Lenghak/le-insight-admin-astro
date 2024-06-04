import { map } from "nanostores";

type AiEnhanceParams = {
	path: string | undefined;
	title?: string;
	body: string;
	trigger: boolean;
};

export const $aiEnhanceStore = map<AiEnhanceParams>({
	path: undefined,
	title: undefined,
	body: "",
	trigger: false,
});

export const setAIEnhance = (params: AiEnhanceParams) =>
	$aiEnhanceStore.set(params);

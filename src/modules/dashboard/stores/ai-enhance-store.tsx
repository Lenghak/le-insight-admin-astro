import { map } from "nanostores";

type AiEnhanceParams = {
	path: string | undefined;
	body: string;
	trigger: boolean;
};

export const $aiEnhanceStore = map<AiEnhanceParams>({
	path: undefined,
	body: "",
	trigger: false,
});

export const setAIEnhance = (params: AiEnhanceParams) =>
	$aiEnhanceStore.set(params);

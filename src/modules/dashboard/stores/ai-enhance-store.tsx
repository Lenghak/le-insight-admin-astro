import { TextIcon, type LucideIcon } from "lucide-react";
import { map } from "nanostores";

type AiEnhanceParams = {
  path: string | undefined;
  title?: string;
  body: string;
  trigger: boolean;
  icon: LucideIcon;
};

export const $aiEnhanceStore = map<AiEnhanceParams>({
  path: undefined,
  title: undefined,
  body: "",
  trigger: false,
  icon: TextIcon,
});

export const setAIEnhance = (params: AiEnhanceParams) =>
  $aiEnhanceStore.set(params);

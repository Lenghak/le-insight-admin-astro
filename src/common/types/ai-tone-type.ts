import { z } from "zod";

export const AiToneEnumSchema = z.enum([
	"academic",
	"business",
	"casual",
	"childfriendly",
	"conversational",
	"emotional",
	"humorous",
	"informative",
	"inspirational",
	"memeified",
	"narrative",
	"objective",
	"persuasive",
	"poetic",
]);

export type AiToneEnumType = z.infer<typeof AiToneEnumSchema>;

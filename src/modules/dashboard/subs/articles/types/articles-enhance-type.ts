import { z } from "zod";

export const ArticlesEnhanceRequestSchema = z.object({
	content: z.string().max(2000),
	path: z.string(),
});

export type ArticlesEnhanceRequestType = z.infer<
	typeof ArticlesEnhanceRequestSchema
>;

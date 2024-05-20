import { z } from "zod";

export const CategoriesCreateRequestSchema = z.object({
	label: z.string().min(1, "Enter a label").trim(),
});
export type CategoriesCreateType = z.infer<
	typeof CategoriesCreateRequestSchema
>;

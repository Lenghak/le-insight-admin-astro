import { z } from "zod";

export const CategoriesCreateRequestSchema = z.object({
  label: z.string().min(1, "Enter a label").trim(),
  description: z.string().min(1, "Describe the category").trim(),
});
export type CategoriesCreateType = z.infer<
  typeof CategoriesCreateRequestSchema
>;

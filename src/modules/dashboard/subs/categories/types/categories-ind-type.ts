import { z } from "zod";

import { CategoriesSchema } from "@/common/types/categories-type";
import { createResponseSchema } from "@/common/types/response-type";

export const CategoriesRequestSchema = z.object({
  userID: z.string().uuid().optional(),
});
export const CategoriesCreateSchema = z.object({
  label: z.string().min(1, "Enter a label").trim(),
  description: z.string().min(1, "Describe the category").trim(),
});

export const CategoriesResponseSchema = createResponseSchema({
  id: CategoriesSchema.shape.id,
  type: CategoriesSchema.shape.type,
  attributes: CategoriesSchema.omit({ id: true, type: true }),
});

export type CategoriesRequestType = z.infer<typeof CategoriesRequestSchema>;
export type CategoriesResponseType = z.infer<typeof CategoriesResponseSchema>;
export type CategoriesCreateType = z.infer<typeof CategoriesCreateSchema>;

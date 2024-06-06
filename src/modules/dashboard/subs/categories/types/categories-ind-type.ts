import { z } from "zod";

import { CategoriesSchema } from "@/common/types/categories-type";
import { createResponseSchema } from "@/common/types/response-type";

export const CategoriesRequestSchema = z.object({
  categoryId: z.string().uuid().optional(),
});

export const CategoriesResponseSchema = createResponseSchema({
  id: CategoriesSchema.shape.id,
  type: CategoriesSchema.shape.type,
  attributes: CategoriesSchema.omit({ id: true, type: true }),
});

export type CategoriesRequestType = z.infer<typeof CategoriesRequestSchema>;
export type CategoriesResponseType = z.infer<typeof CategoriesResponseSchema>;

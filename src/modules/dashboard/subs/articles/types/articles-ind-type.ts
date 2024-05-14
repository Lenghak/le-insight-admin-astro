import { z } from "zod";

import { ArticlesSchema } from "@/common/types/articles-type";
import { createResponseSchema } from "@/common/types/response-type";

export const ArticlesRequestSchema = z.object({
  articleID: z.string().uuid().optional(),
});

export const ArticlesResponseSchema = createResponseSchema({
  id: ArticlesSchema.shape.id,
  type: ArticlesSchema.shape.type,
  attributes: ArticlesSchema.omit({ id: true, type: true }),
});

export type ArticlesRequestType = z.infer<typeof ArticlesRequestSchema>;
export type ArticlesResponseType = z.infer<typeof ArticlesResponseSchema>;

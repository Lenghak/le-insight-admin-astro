import { z } from "zod";

export const CategoriesRegenSchema = z.object({
  article_id: z.string().uuid(),
});

export type CategoriesRegenType = z.infer<typeof CategoriesRegenSchema>;

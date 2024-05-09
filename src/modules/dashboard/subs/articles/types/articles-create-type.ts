import type { z } from "zod";

import { ArticlesSchema } from "@/common/types/articles-type";

export const CreateArticleSchema = ArticlesSchema.pick({
  preview_title: true,
  preview_description: true,
  content: true,
  user_id: true,
  visibility: true,
});

export type CreateArticleType = z.infer<typeof CreateArticleSchema>;

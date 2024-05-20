import type { z } from "zod";

import { ArticlesSchema } from "@/common/types/articles-type";

export const UpdateArticleSchema = ArticlesSchema.pick({
	visibility: true,
});

export type UpdateArticleRequestType = z.infer<typeof UpdateArticleSchema>;

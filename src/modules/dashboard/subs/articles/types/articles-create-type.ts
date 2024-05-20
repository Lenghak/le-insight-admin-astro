import type { z } from "zod";

import { ArticlesSchema } from "@/common/types/articles-type";

export const CreateArticleSchema = ArticlesSchema.pick({
	preview_title: true,
	preview_description: true,
	thumbnail: true,
	content_html: true,
	content_plain_text: true,
	content_editor: true,
	visibility: true,
});

export type CreateArticleRequestType = z.infer<typeof CreateArticleSchema>;

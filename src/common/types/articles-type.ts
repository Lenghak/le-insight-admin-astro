import { z } from "zod";

export const ArticlesVisiblityEnum = z.enum([
  "DRAFT",
  "PUBLIC",
  "PRIVATE",
  "PREMIUM",
  "ARCHIVED",
]);

export const ArticlesSchema = z.object({
  type: z.literal("Articles"),
  id: z.string().uuid(),
  user_id: z.string(),
  preview_title: z.string(),
  preview_description: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  thumbnail: z.string().url().nullable(),
  content_html: z.string().nullable(),
  content_plain_text: z.string().nullable(),
  content_editor: z.string().nullable(),
  visibility: ArticlesVisiblityEnum,
  visit_count: z.number(),
  like_count: z.number(),
  comment_count: z.number(),
});

export type ArticlesVisiblityEnumType = z.infer<typeof ArticlesVisiblityEnum>;
export type ArticlesType = z.infer<typeof ArticlesSchema>;

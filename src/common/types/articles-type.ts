import { z } from "zod";

export const ArticlesVisiblityEnum = z.enum([
  "DRAFT",
  "PUBLIC",
  "PRIVATE",
  "PREMIUM",
  "ARCHIVED",
]);

export const ArticlesSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  content: z.string().nullable(),
  visibility: ArticlesVisiblityEnum,
  visit_count: z.number(),
  like_count: z.number(),
  comment_count: z.number(),
});

export type ArticlesVisiblityEnumType = z.infer<typeof ArticlesVisiblityEnum>;
export type ArticlesType = z.infer<typeof ArticlesSchema>;

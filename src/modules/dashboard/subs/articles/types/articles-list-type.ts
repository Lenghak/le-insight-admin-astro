import { z } from "zod";

import {
  ArticlesSchema,
  ArticlesVisiblityEnum,
} from "@/common/types/articles-type";
import { CategoriesSchema } from "@/common/types/categories-type";
import {
  PaginationMetaSchema,
  PaginationRequestSchema,
} from "@/common/types/pagination-type";
import { ProfilesSchema } from "@/common/types/profiles-type";
import {
  SensitivitiesSchema,
  SensitivitySentimentSchema,
} from "@/common/types/sensitivities-type";
import { UsersSchema } from "@/common/types/users-type";

export const ArticlesListDataSchema = ArticlesSchema.omit({
  content_html: true,
  content_plain_text: true,
}).extend({
  article_author: UsersSchema.extend({ profile: ProfilesSchema }),
  article_categories: z.array(
    z.object({
      article_id: z.string(),
      category_id: z.string(),
      category: CategoriesSchema,
    }),
  ),
  article_sensitivities: z.array(
    z.object({
      article_id: z.string(),
      sensitivity_id: z.string(),
      sensitivity: SensitivitiesSchema,
      sentiment: SensitivitySentimentSchema,
    }),
  ),
});

export const ArticlesCategoriesListSchema = z.object({
  article_id: z.string(),
  category_id: z.string(),
  article: ArticlesSchema.omit({
    content_html: true,
    content_plain_text: true,
  }).extend({
    article_author: UsersSchema.extend({
      profile: ProfilesSchema.pick({
        id: true,
        first_name: true,
        last_name: true,
        image_url: true,
      }),
    }),
    article_categories: z.array(
      z.object({
        article_id: z.string(),
        category_id: z.string(),
        category: CategoriesSchema,
      }),
    ),
  }),
});

export const ArticlesCategoriesListResponseSchema = z.object({
  data: z.array(ArticlesCategoriesListSchema),
  meta: PaginationMetaSchema,
});

export const ArticlesListRequestSchema = PaginationRequestSchema.extend({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  status: ArticlesVisiblityEnum.optional().catch(undefined),
  category: z.string().optional(),
});

export const ArticlesListResponseSchema = z.object({
  data: z.array(ArticlesListDataSchema),
  meta: PaginationMetaSchema,
});

export type ArticlesListDataType = z.infer<typeof ArticlesListDataSchema>;
export type ArticlesListRequestType = z.infer<typeof ArticlesListRequestSchema>;
export type ArticlesListResponseType = z.infer<
  typeof ArticlesListResponseSchema
>;
export type ArticlesCategoriesListType = z.infer<
  typeof ArticlesCategoriesListSchema
>;
export type ArticlesCategoriesListResponseType = z.infer<
  typeof ArticlesCategoriesListResponseSchema
>;

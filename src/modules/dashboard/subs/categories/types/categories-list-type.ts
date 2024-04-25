import { z } from "zod";

import { CategoriesSchema } from "@/common/types/categories-type";
import {
  PaginationMetaSchema,
  PaginationRequestSchema,
} from "@/common/types/pagination-type";

export const CategoriesTableSchema = CategoriesSchema.omit({
  type: true,
});

export const CategoriesListRequestSchema = PaginationRequestSchema.extend({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

export const CategoriesListResponseSchema = z.object({
  data: z.array(CategoriesTableSchema),
  meta: z.object({
    pagination: PaginationMetaSchema,
  }),
});

export type CategoriesTableType = z.infer<typeof CategoriesTableSchema>;

export type CategoriesListRequestType = z.infer<
  typeof CategoriesListRequestSchema
>;
export type CategoriesListResponseType = z.infer<
  typeof CategoriesListResponseSchema
>;

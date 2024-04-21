import { z } from "zod";

export const CategoriesStatusEnum = z.enum([
  "ACTIVE",
  "INACTIVE",
  "PENDING",
  "REVOKED",
]);

export const CategoriesSchema = z.object({
  type: z.literal("category"),
  id: z.string().uuid(),
  label: z.string().nullable(),
  description: z.string().nullable(),
  assigned_count: z.number().nullable(),
  generated_count: z.number().nullable(),
  status: CategoriesStatusEnum.nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type CategoriesStatusType = z.infer<typeof CategoriesStatusEnum>;
export type CategoriesType = z.infer<typeof CategoriesSchema>;

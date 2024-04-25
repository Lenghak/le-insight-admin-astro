import type { z } from "zod";

import { CategoriesSchema } from "@/common/types/categories-type";

export const CategoriesEditRequestSchema = CategoriesSchema.pick({
  id: true,
  label: true,
  status: true,
  description: true,
  assigned_count: true,
  generated_count: true,
}).partial();

export type CategoryEditRequestType = z.infer<
  typeof CategoriesEditRequestSchema
>;

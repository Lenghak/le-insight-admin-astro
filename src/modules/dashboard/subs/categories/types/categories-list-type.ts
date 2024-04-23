import type { z } from "zod";

import { CategoriesSchema } from "@/common/types/categories-type";

export const CategoriesTableSchema = CategoriesSchema;

export type CategoriesTableType = z.infer<typeof CategoriesTableSchema>;

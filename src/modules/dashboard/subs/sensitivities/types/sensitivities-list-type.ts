import { z } from "zod";

import {
  PaginationMetaSchema,
  PaginationRequestSchema,
} from "@/common/types/pagination-type";
import {
  SensitivitiesSchema,
  SensitivitiesStatusEnum,
} from "@/common/types/sensitivities-type";

export const SensitivitiesTableSchema = SensitivitiesSchema.omit({
  type: true,
});

export const SensitivitiesListRequestSchema = PaginationRequestSchema.extend({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  status: SensitivitiesStatusEnum.optional().catch(undefined),
});

export const SensitivitiesListResponseSchema = z.object({
  data: z.array(SensitivitiesTableSchema),
  meta: PaginationMetaSchema,
});

export type SensitivitiesTableType = z.infer<typeof SensitivitiesTableSchema>;

export type SensitivitiesListRequestType = z.infer<
  typeof SensitivitiesListRequestSchema
>;
export type SensitivitiesListResponseType = z.infer<
  typeof SensitivitiesListResponseSchema
>;

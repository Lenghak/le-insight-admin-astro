import { z } from "zod";

import { createResponseSchema } from "@/common/types/response-type";
import { SensitivitiesSchema } from "@/common/types/sensitivities-type";

export const SensitivitiesRequestSchema = z.object({
  sensitivityId: z.string().uuid().optional(),
});

export const SensitivitiesResponseSchema = createResponseSchema({
  id: SensitivitiesSchema.shape.id,
  type: SensitivitiesSchema.shape.type,
  attributes: SensitivitiesSchema.omit({ id: true, type: true }),
});

export type SensitivitiesRequestType = z.infer<
  typeof SensitivitiesRequestSchema
>;
export type SensitivitiesResponseType = z.infer<
  typeof SensitivitiesResponseSchema
>;

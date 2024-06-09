import type { z } from "zod";

import { SensitivitiesSchema } from "@/common/types/sensitivities-type";

export const SensitivitiesEditRequestSchema = SensitivitiesSchema.pick({
  id: true,
  label: true,
  status: true,
  assigned_count: true,
  generated_count: true,
}).partial();

export type SensitivitiesEditRequestType = z.infer<
  typeof SensitivitiesEditRequestSchema
>;

import { z } from "zod";

export const SensitivitiesStatusEnum = z.enum([
  "ACTIVE",
  "INACTIVE",
  "PENDING",
  "REVOKED",
]);
export const SensitivitySentimentSchema = z.enum([
  "POSITIVE",
  "NEGATIVE",
  "NEUTRAL",
  "MIXED",
]);
export const SensitivitiesSchema = z.object({
  type: z.literal("sensitivity"),
  id: z.string().uuid(),
  label: z.string(),
  assigned_count: z.number(),
  generated_count: z.number(),
  status: SensitivitiesStatusEnum,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type SensitivitiesStatusType = z.infer<typeof SensitivitiesStatusEnum>;
export type SensitivitiesType = z.infer<typeof SensitivitiesSchema>;

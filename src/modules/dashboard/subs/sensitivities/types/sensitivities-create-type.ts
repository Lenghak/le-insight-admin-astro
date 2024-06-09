import { z } from "zod";

export const SensitivitiesCreateRequestSchema = z.object({
  label: z.string().min(1, "Enter a label").trim(),
});
export type SensitivitiesCreateType = z.infer<
  typeof SensitivitiesCreateRequestSchema
>;

import { z } from "zod";

export const SensitivitiesRegenSchema = z.object({
  article_id: z.string().uuid(),
});

export type SensitivitiesRegenType = z.infer<typeof SensitivitiesRegenSchema>;

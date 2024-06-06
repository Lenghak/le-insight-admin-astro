import type { z } from "zod";

import { UsersSchema } from "@/common/types/users-type";

export const UsersEditRequestSchema = UsersSchema.pick({
  id: true,
  role: true,
  banned_at: true,
  banned_until: true,
}).partial();

export type UserEditRequestType = z.infer<typeof UsersEditRequestSchema>;

import type { z } from "zod";

import { UsersSchema } from "@/common/types/users-type";

export const UsersEditRequestSchema = UsersSchema.pick({
  id: true,
  role: true,
});

export type UserEditRequestType = z.infer<typeof UsersEditRequestSchema>;

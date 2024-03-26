import { z } from "zod";

import { PaginationMetaSchema } from "@/common/types/pagination-type";
import { ProfilesSchema } from "@/common/types/profiles-type";
import { UsersSchema } from "@/common/types/users-type";

export const UsersTableSchema = UsersSchema.omit({ type: true }).extend({
  profile: ProfilesSchema,
  id: UsersSchema.shape.id,
  type: z.literal("users"),
});

export const UsersListResponseSchema = z.object({
  data: z.array(UsersTableSchema),
  meta: z.object({
    pagination: PaginationMetaSchema,
  }),
});

export type UsersListResponseType = z.infer<typeof UsersListResponseSchema>;
export type UsersTableType = z.infer<typeof UsersTableSchema>;

import { z } from "zod";

import {
  PaginationMetaSchema,
  PaginationRequestSchema,
} from "@/common/types/pagination-type";
import { ProfileSexSchema, ProfilesSchema } from "@/common/types/profiles-type";
import { UserRoleSchema, UsersSchema } from "@/common/types/users-type";

export const UsersTableSchema = UsersSchema.omit({ type: true }).extend({
  profile: ProfilesSchema,
  id: UsersSchema.shape.id,
  type: z.literal("users"),
});

export const UsersListRequestSchema = PaginationRequestSchema.extend({
  role: UserRoleSchema.nullable().optional(),
  "sex[]": z.array(ProfileSexSchema).optional(),
});

export const UsersListResponseSchema = z.object({
  data: z.array(UsersTableSchema),
  meta: z.object({
    pagination: PaginationMetaSchema,
  }),
});

export type UsersListRequestType = z.infer<typeof UsersListRequestSchema>;
export type UsersListResponseType = z.infer<typeof UsersListResponseSchema>;
export type UsersTableType = z.infer<typeof UsersTableSchema>;

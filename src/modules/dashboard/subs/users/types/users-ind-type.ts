import { z } from "zod";

import { ProfilesSchema } from "@/common/types/profiles-type";
import { createResponseSchema } from "@/common/types/response-type";
import { UsersSchema } from "@/common/types/users-type";

export const UsersRequestSchema = z.object({
  userID: z.string().uuid().optional(),
});

export const UsersResponseSchema = createResponseSchema({
  id: UsersSchema.shape.id,
  type: UsersSchema.shape.type,
  attributes: UsersSchema.omit({ id: true, type: true }),
  included: z.array(ProfilesSchema),
  relationships: ProfilesSchema,
});

export type UsersRequestType = z.infer<typeof UsersRequestSchema>;
export type UsersResponseType = z.infer<typeof UsersResponseSchema>;

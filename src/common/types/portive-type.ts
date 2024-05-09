import type { UploadFinishEvent } from "@portive/client";
import { z } from "zod";

export const PortiveResponseSchema = z.custom<UploadFinishEvent>();

export type PortiveResponseType = z.infer<typeof PortiveResponseSchema>;

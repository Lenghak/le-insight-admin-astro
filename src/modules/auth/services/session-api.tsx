import type { Session } from "@auth/core/types";

import { getPublicQueryInstance } from "@/common/stores/api-store";

export default async function getSession() {
  return getPublicQueryInstance().get<Session | null>("/api/auth/session", {
    baseURL: "/",
  });
}

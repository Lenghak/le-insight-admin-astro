import getUserAPI from "@/modules/dashboard/subs/users/services/get-user-api";

import type { APIContext, MiddlewareNext } from "astro";
import { getSession } from "auth-astro/server";

export default async function auth(context: APIContext, next: MiddlewareNext) {
  const currentPathname = context.url.pathname;
  const isAuthPath = currentPathname.startsWith("/auth");

  const session = await getSession(context.request);
  const userSession = session?.user.id
    ? await getUserAPI({ userID: session?.user.id })
    : undefined;
  const isUserLoggedIn = !!userSession?.data?.data?.id;

  const isDashboardPath = currentPathname.startsWith("/spa");
  const isAPIPath = currentPathname.startsWith("/api");
  // check if the user has already logged in
  if (isAuthPath && isUserLoggedIn) {
    return context.redirect("/");
  }

  if (
    !isAPIPath &&
    isDashboardPath &&
    !isUserLoggedIn &&
    !isAuthPath &&
    session?.user.role !== "ADMIN"
  )
    return context.redirect("/auth/sign-in");

  return next();
}

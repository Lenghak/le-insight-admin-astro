import getUserAPI from "@users/services/get-user-api";

import type { APIContext, MiddlewareNext } from "astro";
import { getSession } from "auth-astro/server";

export default async function auth(context: APIContext, next: MiddlewareNext) {
  const currentPathname = context.url.pathname;
  const isAuthPath = currentPathname.startsWith("/auth");
  const isErrorPath =
    currentPathname.startsWith("/4") || currentPathname.startsWith("/5");

  if (isErrorPath) return next();

  const session = await getSession(context.request);
  const userSession = session?.user.id
    ? await getUserAPI({ userID: session?.user.id }).catch((_) => undefined)
    : undefined;

  const isUserLoggedIn = !!userSession;

  if (!isUserLoggedIn && !isAuthPath) return context.redirect("/403");

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

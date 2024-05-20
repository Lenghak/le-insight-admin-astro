import type { APIContext, MiddlewareNext } from "astro";
import { getSession } from "auth-astro/server";

export default async function auth(context: APIContext, next: MiddlewareNext) {
	const currentPathname = context.url.pathname;
	const isAuthPath = currentPathname.startsWith("/auth");

	const session = await getSession(context.request);
	const isUserLoggedIn = session?.user;

	const isDashboardPath = currentPathname.startsWith("/dashboard");
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

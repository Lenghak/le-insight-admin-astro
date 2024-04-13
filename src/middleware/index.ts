import { sequence } from "astro/virtual-modules/middleware.js";

import auth from "./auth";

export const onRequest = sequence(auth);

import { sequence } from "astro/virtual-modules/middleware.js";

import auth from "./auth";
import cors from "./cors";

export const onRequest = sequence(cors, auth);

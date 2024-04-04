import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    auth(),
  ],
  prefetch: {
    defaultStrategy: "hover",
  },
  redirects: {
    "/": {
      status: 307,
      destination: "/dashboard/users",
    },
  },
  vite: {
    ssr: {
      noExternal: ["react-tweet"],
    },
  },
});

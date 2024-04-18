import { ThemeProvider } from "@/modules/dashboard/providers/theme-provider";

import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import { dashboardRoute as router } from "./dashboard-route";

export default function Routes() {
  return (
    <StrictMode>
      <ThemeProvider storageKey="theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
}

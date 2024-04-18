import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import { dashboardRoute as router } from "./dashboard-route";

export default function Routes() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

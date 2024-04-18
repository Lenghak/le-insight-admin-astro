import DashboardLayout from "@/modules/dashboard/layouts/dashboard-layout";
import { BackButton } from "@/modules/error/components/back-button";
import ErrorSection from "@/modules/error/components/error-section";

import UsersRoutes from "@users/routes";
import { PawPrintIcon } from "lucide-react";
import { createBrowserRouter } from "react-router-dom";

export const dashboardRoute = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: (
      <DashboardLayout>
        <ErrorSection
          img={
            <PawPrintIcon
              size={96}
              strokeWidth={2}
              className="mb-4"
            />
          }
          title="Page Not Found"
          description="Looks like you have stumble across a page that does not exist in our universe."
          action={<BackButton className="mt-6" />}
        />
      </DashboardLayout>
    ),
    children: [
      {
        path: "/dashboard/users",
        element: <UsersRoutes />,
      },
    ],
  },
]);

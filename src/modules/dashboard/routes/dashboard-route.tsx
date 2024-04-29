import { BackButton } from "@/modules/error/components/back-button";
import ErrorSection from "@/modules/error/components/error-section";

import DashboardLayout from "@dashboard/layouts/dashboard-layout";
import { CategoriesRoute } from "@dashboard/subs/categories/routes";

import UsersRoute from "@users/routes";

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
        path: "/dashboard",
        element: (
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
        ),
      },
      {
        path: "/dashboard/users",
        element: <UsersRoute />,
      },
      {
        path: "/dashboard/categories",
        element: <CategoriesRoute />,
      },
    ],
  },
]);

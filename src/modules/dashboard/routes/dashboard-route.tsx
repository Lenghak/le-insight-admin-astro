import { BackButton } from "@/modules/error/components/back-button";
import ErrorSection from "@/modules/error/components/error-section";

import DashboardLayout from "@dashboard/layouts/dashboard-layout";
import { CategoriesRoute } from "@dashboard/subs/categories/routes";

import { BombIcon, ConstructionIcon, PawPrintIcon } from "lucide-react";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const ArticlesRoute = React.lazy(
  () => import("@articles/routes/articles-route"),
);
const UsersRoute = React.lazy(() => import("@users/routes"));
const Editor = React.lazy(
  () => import("@/modules/editor/presenters/plate-editor"),
);

export const dashboardRoute = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: (
      <DashboardLayout>
        <ErrorSection
          img={
            <BombIcon
              size={96}
              strokeWidth={2}
              className="mb-4"
            />
          }
          title="Internal Server Eror"
          description="Looks there's been a problem on our end. Sit tight! We'll get this fixed as soon as possible"
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
              <ConstructionIcon
                size={96}
                strokeWidth={2}
                className="mb-4"
              />
            }
            title="Page in Development"
            description="Stay tune! We are still constructing this page. It may not available right now."
            action={<BackButton className="mt-6" />}
          />
        ),
      },
      {
        path: "/dashboard/users",
        element: <UsersRoute />,
      },
      {
        path: "/dashboard/articles",
        element: <ArticlesRoute />,
      },
      {
        path: "/dashboard/categories",
        element: <CategoriesRoute />,
      },
      {
        path: "/dashboard/editor",
        element: <Editor />,
      },
      {
        path: "/dashboard/*",
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
    ],
  },
]);

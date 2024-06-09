import { BackButton } from "@/modules/error/components/back-button";
import ErrorSection from "@/modules/error/components/error-section";
import RootBoundary from "@/modules/error/composites/spa-error-page";

import { DefaultSkeleton } from "@custom/skeletons/default-skeletons";

import { ConstructionIcon } from "lucide-react";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const DashboardLayout = React.lazy(
  () => import("@dashboard/layouts/dashboard-layout"),
);

const ArticlesRoute = React.lazy(() => import("@articles/routes"));
const CategoriesRoute = React.lazy(() => import("@categories/routes"));
const EditorRoute = React.lazy(() => import("@editor/routes"));
const UsersRoute = React.lazy(() => import("@users/routes"));

export const dashboardRoute = createBrowserRouter([
  {
    path: "/",
    errorElement: <RootBoundary />,
    children: [
      {
        path: "/spa/dashboard",
        errorElement: (
          <React.Suspense fallback={<DefaultSkeleton />}>
            <DashboardLayout>
              <RootBoundary />
            </DashboardLayout>
          </React.Suspense>
        ),
        element: (
          <React.Suspense fallback={<DefaultSkeleton />}>
            <DashboardLayout />
          </React.Suspense>
        ),
        children: [
          {
            path: "/spa/dashboard",
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
            path: "/spa/dashboard/users",
            element: (
              <React.Suspense fallback={<DefaultSkeleton />}>
                <UsersRoute />
              </React.Suspense>
            ),
          },
          {
            path: "/spa/dashboard/articles",
            element: (
              <React.Suspense fallback={<DefaultSkeleton />}>
                <ArticlesRoute />
              </React.Suspense>
            ),
          },
          {
            path: "/spa/dashboard/categories",
            element: (
              <React.Suspense fallback={<DefaultSkeleton />}>
                <CategoriesRoute />
              </React.Suspense>
            ),
          },
        ],
      },
      {
        path: "/spa/editor",
        element: (
          <React.Suspense fallback={<DefaultSkeleton />}>
            <EditorRoute />
          </React.Suspense>
        ),
      },
    ],
  },
]);

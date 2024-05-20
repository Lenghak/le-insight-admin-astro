import { BackButton } from "@/modules/error/components/back-button";
import ErrorSection from "@/modules/error/components/error-section";
import RootBoundary from "@/modules/error/composites/spa-error-page";

import DashboardLayout from "@dashboard/layouts/dashboard-layout";
import { CategoriesRoute } from "@dashboard/subs/categories/routes";

import ArticlesRoute from "@articles/routes/articles-route";

import UsersRoute from "@users/routes/users-route";

import { ConstructionIcon } from "lucide-react";
import { createBrowserRouter } from "react-router-dom";

export const dashboardRoute = createBrowserRouter([
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		errorElement: (
			<DashboardLayout>
				<RootBoundary />
			</DashboardLayout>
		),
		children: [
			{
				path: "/dashboard",
				element: (
					<ErrorSection
						img={
							<ConstructionIcon size={96} strokeWidth={2} className="mb-4" />
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
		],
	},
]);

import DashboardTitle from "@dashboard/composites/dashboard-title";

import UsersBanForm from "@users/composites/users-ban-form";
import UsersCreateForm from "@users/composites/users-create-form";
import UsersEditForm from "@users/composites/users-edit-form";
import UsersSheet from "@users/composites/users-sheet";
import UsersTable from "@users/presenters/users-table";

export default function UsersRoute() {
	return (
		<section className="flex h-full w-full flex-col p-6 pb-4 pr-4">
			<div className="flex items-end justify-between">
				<DashboardTitle title="Users" spa />

				<div className="flex items-center justify-center gap-4">
					<UsersCreateForm />
				</div>
			</div>

			<UsersTable />

			<UsersSheet />

			<UsersEditForm />

			<UsersBanForm />
		</section>
	);
}
